import { type PropsWithChildren, useState } from 'react'
import { type Descendant } from 'slate'
import {
  Textbit,
  Menu,
  Toolbar,
  usePluginRegistry,
  useTextbit,
  DropMarker
} from '@ttab/textbit'
import { ThemeSwitcher } from './themeSwitcher'
import { TextbitDocument } from './TextbitDocument'
import {
  Text,
  Bold,
  Italic,
  Underline,
  Link,
  CodeBlock,
  BulletList,
  NumberList,
  Blockquote,
  LocalizedQuotationMarks,
  Image,
  OEmbed
} from '../../lib'

/**
 * Define Slate CustomTypes to be Textbit types
 */
import {
  type TBElement,
  type TBEditor,
  type TBText,
  type PluginRegistryAction
} from '@ttab/textbit'

declare module 'slate' {
  interface CustomTypes {
    Editor: TBEditor
    Element: TBElement
    Text: TBText
  }
}


export function App(): JSX.Element {
  const plugins = [
    Text,
    Bold,
    Italic,
    Underline,
    CodeBlock,
    Link,
    BulletList,
    NumberList,
    Blockquote,
    LocalizedQuotationMarks,
    Image,
    OEmbed
  ]

  return (
    <div style={{
      margin: '0 auto',
      height: '100vh',
      maxWidth: '800px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Textbit.Root verbose={true} plugins={plugins}>
        <Editor initialValue={TextbitDocument} />
      </Textbit.Root>
    </div >
  )
}


function Editor({ initialValue }: {
  initialValue: Descendant[]
}): JSX.Element {
  const [value, setValue] = useState<Descendant[]>(initialValue)
  const { characters } = useTextbit()

  return (
    <>
      <div style={{ height: '47px', display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
        <ThemeSwitcher />
        <div>
          Characters: {characters}
        </div>
      </div>

      <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
        <Textbit.Editable
          value={value}
          onChange={value => {
            console.log(value, null, 2)
            setValue(value)
          }}
        >
          <DropMarker />

          <ToolbarMenu />

          <Textbit.Gutter className="w-12">
            <ContentMenu />
          </Textbit.Gutter>
        </Textbit.Editable>
      </div>
    </>
  )
}

function ToolbarMenu(): JSX.Element {
  const { actions } = usePluginRegistry()

  const leafActions = actions.filter(action => ['leaf'].includes(action.plugin.class))
  const inlineActions = actions.filter(action => ['inline'].includes(action.plugin.class))

  return (
    <Toolbar.Root
      className="flex select-none divide-x p-1 border rounded-lg cursor-default shadow-xl border bg-white border-gray-100 "
    >
      <Toolbar.Group key="leafs" className="flex place-items-center pr-1 gap-1">
        {leafActions.map(action => {
          return <ToolbarItem action={action} key={`${action.plugin.name}`} />
        })}
      </Toolbar.Group>

      <Toolbar.Group key="inlines" className="flex pl-1">
        {inlineActions.map(action => {
          return <ToolbarItem
            action={action}
            key={`${action.plugin.name}`}
          />
        })}
      </Toolbar.Group>
    </Toolbar.Root>
  )
}

// FIXME: Textbit must export this type or action better
function ToolbarItem({ action }: { action: PluginRegistryAction }): JSX.Element {
  return <Toolbar.Item
    action={action}
    className="p-2 w-8 h-8 flex place-items-center rounded border border-white hover:bg-gray-100 hover:border-gray-200 pointer data-[state='active']:bg-gray-100 data-[state='active']:border-gray-200"
  />
}

function ContentMenu(): JSX.Element {
  const { actions } = usePluginRegistry()

  const textActions = actions.filter(action => action.plugin.class === 'text')
  const textblockActions = actions.filter(action => action.plugin.class === 'textblock')
  const blockActions = actions.filter(action => action.plugin.class === 'block')

  return (
    <Menu.Root className="group">
      <Menu.Trigger className="flex justify-center place-items-center center font-bold border w-8 h-8 ml-2 rounded-full cursor-default group-data-[state='open']:border-gray-400 hover:border-gray-400">⋮</Menu.Trigger>
      <Menu.Content className="flex flex-col -mt-4 ml-8 border rounded-lg divide-y shadow-xl bg-white bg-white border-gray-100">
        {textActions.length > 0 &&
          <ContentMenuGroup>
            {textActions.map(action => <ContentMenuItem action={action} key={`${action.key}-${action.title}`} />)}
          </ContentMenuGroup>
        }

        {textblockActions.length > 0 &&
          <ContentMenuGroup>
            {textblockActions.map(action => <ContentMenuItem action={action} key={`${action.key}-${action.title}`} />)}
          </ContentMenuGroup>
        }

        {blockActions.length > 0 &&
          <ContentMenuGroup>
            {blockActions.map(action => <ContentMenuItem action={action} key={`${action.key}-${action.title}`} />)}
          </ContentMenuGroup>
        }
      </Menu.Content>
    </Menu.Root >
  )
}

function ContentMenuGroup({ children }: PropsWithChildren): JSX.Element {
  return (
    <Menu.Group className="flex flex-col p-1 text-md">
      {children}
    </Menu.Group>
  )
}

function ContentMenuItem({ action }: { action: PluginRegistryAction }): JSX.Element {
  return (
    <Menu.Item
      action={action}
      className="grid gap-x-5 py-1 border group grid-cols-[1.5rem_minmax(max-content,_220px)_minmax(max-content,_90px)] rounded cursor-default border-white hover:border-gray-200 hover:bg-gray-100"
    >
      <Menu.Icon className="flex justify-self-end self-center group-data-[state='active']:font-semibold" />
      <Menu.Label className="self-center text-sm group-data-[state='active']:font-semibold" />
      <Menu.Hotkey className="justify-self-end self-center pl-6 pr-3 text-sm opacity-70" />
    </Menu.Item>
  )
}
