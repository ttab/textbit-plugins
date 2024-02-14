
import { ListIcon, ListOrderedIcon } from 'lucide-react'

import type {
  Plugin,
  TBEditor,
  TBElement,
  TBText
} from '@ttab/textbit'

import { List, ListItem } from './components'
import { actionHandler } from './lib/actionHandler'
import { normalizeNode } from './lib/normalizeNode'
import type { Editor, NodeEntry } from 'slate'

/**
 * Define Slate CustomTypes to be Textbit types
 */
declare module 'slate' {
  interface CustomTypes {
    Editor: TBEditor
    Element: TBElement
    Text: TBText
  }
}

export const BulletList: Plugin.Definition = {
  class: 'text',
  name: 'core/bullet-list',
  actions: [
    {
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
