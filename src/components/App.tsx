import { useState } from 'react'
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
      className="flex select-none rounded divide-x p-1 cursor-default shadow-xl border bg-white border-gray-100 bg-gradient-to-b from-white to-gray-100"
    >
      <Toolbar.Group key="leafs" className="flex place-items-center pr-1">
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
    className="p-2 w-8 h-8 flex place-items-center rounded hover:bg-gray-200 pointer"
  />
}

function ContentMenu(): JSX.Element {
  const { actions } = usePluginRegistry()

  const textActions = actions.filter(action => action.plugin.class === 'text')
  const textblockActions = actions.filter(action => action.plugin.class === 'textblock')
  const blockActions = actions.filter(action => action.plugin.class === 'block')

  return (
    <Menu.Root>
      <Menu.Trigger className="flex justify-center place-items-center center border w-8 h-8 rounded-full cursor-default hover:border-gray-300">⋮</Menu.Trigger>
      <Menu.Content className="flex flex-col p-1 border bg-white rounded-lg shadow-xl bg-white border-gray-100">
        {textActions.length > 0 &&
          <>
            <Menu.Group className="flex flex-col">
              {textActions.map(action => (
                < Menu.Item key={`${action.key}-${action.title}`} action={action} className="grid-cols-3">
                  <Menu.Icon />
                  <Menu.Label>{action.title}</Menu.Label>
                  <Menu.Hotkey />
                </Menu.Item>
              ))}
            </Menu.Group>

            <Menu.Group>
              {textblockActions.map(action => (
                <Menu.Item key={`${action.key}-${action.title}`} action={action}>
                  <Menu.Label>{action.title}</Menu.Label>
                </Menu.Item>
              ))}
            </Menu.Group>

            <Menu.Group>
              {blockActions.map(action => (
                <Menu.Item key={`${action.key}-${action.title}`} action={action}>
                  <Menu.Label>{action.title}</Menu.Label>
                </Menu.Item>
              ))}
            </Menu.Group>
          </>
        }
      </Menu.Content>
    </Menu.Root >
  )
}
