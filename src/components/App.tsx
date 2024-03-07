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
    <div className="flex flex-col h-[100vh] mx-auto my-0 max-w-screen-md">
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
  const { characters, words } = useTextbit()

  return (
    <div className="mr-12">
      <div className="flex items-center justify-between text-sm gap-4 ml-14 py-4 mb-2 border-b">
        <ThemeSwitcher />
        <div className="flex items-end gap-4">
          <div> Words: {words}</div>
          <div> Characters: {characters}</div>
        </div>
      </div>
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
  )
}

function ToolbarMenu(): JSX.Element {
  const { actions } = usePluginRegistry()

  const leafActions = actions.filter(action => ['leaf'].includes(action.plugin.class))
  const inlineActions = actions.filter(action => ['inline'].includes(action.plugin.class))

  return (
    <Toolbar.Root
      className="flex select-none divide-x p-1 border rounded-lg cursor-default shadow-xl border bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:divide-gray-700 dark:shadow-none"
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

function ToolbarItem({ action }: { action: PluginRegistryAction }): JSX.Element {
  return <Toolbar.Item
    action={action}
    className="p-2 w-8 h-8 flex place-items-center rounded border border-white hover:bg-gray-100 hover:border-gray-200 pointer data-[state='active']:bg-gray-100 data-[state='active']:border-gray-200 dark:border-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:data-[state='active']:bg-gray-700 dark:data-[state='active']:border-gray-700 dark:hover:data-[state='active']:border-gray-600"
  />
}

function ContentMenu(): JSX.Element {
  const { actions } = usePluginRegistry()

  const textActions = actions.filter(action => action.plugin.class === 'text')
  const textblockActions = actions.filter(action => action.plugin.class === 'textblock')
  const blockActions = actions.filter(action => action.plugin.class === 'block')

  return (
    <Menu.Root className="group">
      <Menu.Trigger className="flex justify-center place-items-center center font-bold border w-8 h-8 ml-2 rounded-full cursor-default group-data-[state='open']:border-gray-400 hover:border-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:group-data-[state='open']:border-gray-800 dark:hover:border-gray-500">⋮</Menu.Trigger>
      <Menu.Content className="flex flex-col -mt-[0.75rem] ml-[2.25rem] border rounded-lg divide-y shadow-xl bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:divide-gray-700 dark:shadow-none">
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
      className="grid gap-x-5 py-1 border group grid-cols-[1.5rem_minmax(max-content,_220px)_minmax(max-content,_90px)] rounded cursor-default border-white hover:border-gray-200 hover:bg-gray-100 dark:border-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-700"
    >
      <Menu.Icon className="flex justify-self-end self-center group-data-[state='active']:font-semibold" />
      <Menu.Label className="self-center text-sm group-data-[state='active']:font-semibold" />
      <Menu.Hotkey className="justify-self-end self-center pl-6 pr-3 text-sm opacity-70" />
    </Menu.Item>
  )
}
