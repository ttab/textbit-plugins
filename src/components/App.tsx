import { useState } from 'react'
import { type Descendant } from 'slate'
import { Textbit, Menu, usePluginRegistry, useTextbit } from '@ttab/textbit'
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
      <Textbit.Editor verbose={true} plugins={plugins}>
        <Editor initialValue={TextbitDocument} />
        <Textbit.Footer />
      </Textbit.Editor>
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
          <EditorContentMenu />
        </Textbit.Editable>
      </div>
    </>
  )
}

function EditorContentMenu(): JSX.Element {
  const { actions } = usePluginRegistry()

  const textActions = actions.filter(action => action.plugin.class === 'text')
  const textblockActions = actions.filter(action => action.plugin.class === 'textblock')
  const blockActions = actions.filter(action => action.plugin.class === 'block')

  return (
    <Menu.Wrapper>
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
    </Menu.Wrapper >
  )
}
