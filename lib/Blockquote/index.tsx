import { type Plugin } from '@ttab/textbit'
import {
  Blockquote as BlockquoteComponent,
  BlockquoteBody,
  BlockquoteCaption
} from './components'
import { actionHandler } from './lib/actionHandler'
import { normalizeBlockquote } from './lib/normalizeBlockquote'
import { MessageSquareQuoteIcon } from 'lucide-react'


export const Blockquote: Plugin.Definition = {
  class: 'textblock',
  name: 'core/blockquote',
  actions: [
    {
      title: 'Blockquote',
      tool: () => <MessageSquareQuoteIcon style={{ width: '1em', height: '1em' }} />,
      hotkey: 'mod+shift+2',
      handler: actionHandler,
      visibility: (element) => {
        return [
          true, // Always visible
          true, // Always enabled
          (element.type === 'core/blockquote') // Active when isBlockquote
        ]
      }
    }
  ],
  componentEntry: {
    class: 'textblock',
    component: BlockquoteComponent,
    constraints: {
      normalizeNode: normalizeBlockquote
    },
    children: [
      {
        type: 'body',
        class: 'text',
        component: BlockquoteBody
      },
      {
        type: 'caption',
        class: 'text',
        component: BlockquoteCaption
      }
    ]
  }
}
