import type { TBPluginInitFunction } from '@ttab/textbit'
import { CodeSquareIcon } from 'lucide-react'
import {
  CodeBlock as CodeBlockComponent,
  CodeBlockBody as CodeBlockBodyComponent
} from './components'
import { actionHandler } from './lib/actionHandler'

export const CodeBlock: TBPluginInitFunction = () => {
  return {
    class: 'block',
    name: 'dotvoid/codeblock',
    actions: [
      {
        name: 'codeblock',
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
      class: 'block',
      component: CodeBlockComponent,
      children: [{
        type: 'body',
        class: 'text',
        component: CodeBlockBodyComponent
      }]
    }
  }
}
