import { useState } from 'react'
import { type Descendant } from 'slate'
import { Textbit, TextbitEditable, TextbitFooter, useTextbit } from '@ttab/textbit'
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
  return (
    <div style={{
      margin: '0 auto',
      height: '100vh',
      maxWidth: '800px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Textbit>
        <Editor initialValue={TextbitDocument} />
      </Textbit >
    </div >
  )
}

function Editor({ initialValue }: { initialValue: Descendant[] }): JSX.Element {
  const [, setValue] = useState<Descendant[]>(initialValue)
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
        <TextbitEditable
          value={initialValue}
          plugins={[
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
          ]}
          onChange={value => {
            console.log(value, null, 2)
            setValue(value)
          }}
          verbose={true}
        />
        <TextbitFooter />
      </div>
    </>
  )
}
