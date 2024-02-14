import { Plugin } from '@ttab/textbit'
import { CodeSquareIcon } from 'lucide-react'

import {
  CodeBlock as CodeBlockComponent,
  CodeBlockBody as CodeBlockBodyComponent
} from './components'

import { actionHandler } from './lib/actionHandler'

/**
 * Define Slate CustomTypes to be Textbit types
 */
import type { TBEditor, TBElement, TBText } from '@ttab/textbit'
declare module 'slate' {
  interface CustomTypes {
    Editor: TBEditor
    Element: TBElement
    Text: TBText
  }
}

export const CodeBlock: Plugin.Definition = {
  class: 'textblock',
  name: 'dotvoid/codeblock',
  actions: [
    {
      title: 'Code block',
      tool: () => <CodeSquareIcon style={{ width: '1em', height: '1em' }} />,
      hotkey: 'mod+shift+8',
      handler: ({ editor }) => {
        actionHandler(editor, 'dotvoid/codeblock')
      },
      visibility: (element) => {
        return [
          element.type === 'dotvoid/codeblock',
          true,
          element.type === 'dotvoid/codeblock'
        ]
      }
    }
  ],
  componentEntry: {
    class: 'textblock',
    component: CodeBlockComponent,
    children: [{
      type: 'body',
      class: 'text',
      component: CodeBlockBodyComponent
    }]
  }
}
