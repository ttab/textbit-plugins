
import { ListIcon } from 'lucide-react'
import type { Plugin } from '@ttab/textbit'
import { List, ListItem } from './components'
import { actionHandler } from './lib/actionHandler'
import { normalizeNode } from './lib/normalizeNode'
import type { Editor, NodeEntry } from 'slate'

export const BulletList: Plugin.InitFunction = () => {
  return {
    class: 'text',
    name: 'core/bullet-list',
    actions: [
      {
        name: 'add-bullet-list',
        title: 'Bullet list',
        tool: () => <ListIcon style={{ width: '1em', height: '1em' }} />,
        hotkey: 'mod+shift+8',
        handler: ({ editor }) => {
          actionHandler(editor, 'core/bullet-list')
        },
        visibility: (element) => {
          return [
            element.type === 'core/bullet-list',
            true,
            element.type === 'core/bullet-list'
          ]
        }
      }
    ],
    componentEntry: {
      class: 'text',
      component: List,
      constraints: {
        normalizeNode: (editor: Editor, nodeEntry: NodeEntry) => {
          return normalizeNode(editor, nodeEntry, 'core/bullet-list')
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
