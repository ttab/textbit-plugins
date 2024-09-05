
import { ListOrderedIcon } from 'lucide-react'
import { List, ListItem } from './components'
import { actionHandler } from './lib/actionHandler'
import { normalizeNode } from './lib/normalizeNode'
import type { Editor, NodeEntry } from 'slate'
import type { Plugin } from '@ttab/textbit'

export const OrderedList: Plugin.InitFunction = () => {
  return {
    class: 'text',
    name: 'core/ordered-list',
    actions: [
      {
        name: 'add-ordered-list',
        title: 'Number list',
        tool: () => <ListOrderedIcon style={{ width: '1em', height: '1em' }} />,
        hotkey: 'mod+shift+7',
        handler: ({ editor }) => {
          actionHandler(editor, 'core/ordered-list')
        },
        visibility: (element) => {
          return [
            ['core/ordered-list', 'core/unordered-list', 'core/text'].includes(element.type),
            true,
            element.type === 'core/ordered-list'
          ]
        }
      }
    ],
    componentEntry: {
      class: 'text',
      component: List,
      constraints: {
        normalizeNode: (editor: Editor, nodeEntry: NodeEntry) => {
          return normalizeNode(editor, nodeEntry, 'core/ordered-list')
        }
      },
      children: [
        {
          type: 'list-item',
          class: 'text',
          component: ListItem
        }
      ]
    }
  }
}
