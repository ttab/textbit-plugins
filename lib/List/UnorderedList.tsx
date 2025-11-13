import { ListIcon } from 'lucide-react'
import type { TBPluginDefinition } from '@ttab/textbit'
import { List, ListItem } from './components'
import { actionHandler } from './lib/actionHandler'
import { normalizeNode } from './lib/normalizeNode'
import type { Editor, NodeEntry } from 'slate'

export const UnorderedList: (options?: { title?: string }) => TBPluginDefinition = (options) => {
  return {
    class: 'text',
    name: 'core/unordered-list',
    actions: [
      {
        name: 'add-unordered-list',
        title: options?.title || 'Bullet list',
        tool: () => <ListIcon style={{ width: '1em', height: '1em' }} />,
        hotkey: 'mod+shift+8',
        handler: ({ editor }) => {
          actionHandler(editor, 'core/unordered-list')
        },
        visibility: (element) => {
          return [
            ['core/ordered-list', 'core/unordered-list', 'core/text'].includes(element.type),
            true,
            element.type === 'core/unordered-list'
          ]
        }
      }
    ],
    componentEntry: {
      class: 'text',
      component: List,
      constraints: {
        normalizeNode: (editor: Editor, nodeEntry: NodeEntry) => {
          return normalizeNode(editor, nodeEntry, 'core/unordered-list')
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
