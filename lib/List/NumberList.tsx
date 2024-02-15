
import { ListOrderedIcon } from 'lucide-react'
import { List, ListItem } from './components'
import { actionHandler } from './lib/actionHandler'
import { normalizeNode } from './lib/normalizeNode'
import type { Editor, NodeEntry } from 'slate'
import type { Plugin } from '@ttab/textbit'

export const NumberList: Plugin.Definition = {
  class: 'text',
  name: 'core/number-list',
  actions: [
    {
      title: 'Number list',
      tool: () => <ListOrderedIcon style={{ width: '1em', height: '1em' }} />,
      hotkey: 'mod+shift+7',
      handler: ({ editor }) => {
        actionHandler(editor, 'core/number-list')
      },
      visibility: (element) => {
        return [
          element.type === 'core/number-list',
          true,
          element.type === 'core/number-list'
        ]
      }
    }
  ],
  componentEntry: {
    class: 'text',
    component: List,
    constraints: {
      normalizeNode: (editor: Editor, nodeEntry: NodeEntry) => {
        return normalizeNode(editor, nodeEntry, 'core/number-list')
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
