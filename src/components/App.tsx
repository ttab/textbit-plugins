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
  type TBText
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

          <EditorToolbar />

          <Textbit.Gutter>
            <EditorContentMenu />
          </Textbit.Gutter>
        </Textbit.Editable>
      </div>
    </>
  )
}

function EditorToolbar(): JSX.Element {
  const { actions } = usePluginRegistry()

  const leafActions = actions.filter(action => ['leaf'].includes(action.plugin.class))
  const inlineActions = actions.filter(action => ['inline'].includes(action.plugin.class))

  return (
    <Toolbar.Root className=''>
      <Toolbar.Group key="leafs" className="">
        {leafActions.map(action => {
          return <Toolbar.Item
            className=""
            action={action} key={`${action.plugin.class}-${action.plugin.name}-${action.title}`}
          />
        })}
      </Toolbar.Group>

      <Toolbar.Group key="inlines" className="">
        {inlineActions.map(action => {
          return <Toolbar.Item
            className=""
            action={action} key={`${action.plugin.class}-${action.plugin.name}-${action.title}`}
          />
        })}
      </Toolbar.Group>
    </Toolbar.Root>
  )
}

function EditorContentMenu(): JSX.Element {
  const { actions } = usePluginRegistry()

  const textActions = actions.filter(action => action.plugin.class === 'text')
  const textblockActions = actions.filter(action => action.plugin.class === 'textblock')
  const blockActions = actions.filter(action => action.plugin.class === 'block')

  return (
    <Menu.Root>
      {textActions.length > 0 &&
        <>
          <Menu.Group>
            {textActions.filter(action => !['leaf', 'generic', 'inline'].includes(action.plugin.class)).map(action => (
              <Menu.Item key={`${action.plugin.name}-${action.title}`} action={action}>
                <Menu.Label>{action.title}</Menu.Label>
              </Menu.Item>
            ))}
          </Menu.Group>

          <Menu.Group>
            {textblockActions.filter(action => !['leaf', 'generic', 'inline'].includes(action.plugin.class)).map(action => (
              <Menu.Item key={`${action.plugin.name}-${action.title}`} action={action}>
                <Menu.Label>{action.title}</Menu.Label>
              </Menu.Item>
            ))}
          </Menu.Group>

          <Menu.Group>
            {blockActions.filter(action => !['leaf', 'generic', 'inline'].includes(action.plugin.class)).map(action => (
              <Menu.Item key={`${action.plugin.name}-${action.title}`} action={action}>
                <Menu.Label>{action.title}</Menu.Label>
              </Menu.Item>
            ))}
          </Menu.Group>
        </>
      }
    </Menu.Root >
  )
}
