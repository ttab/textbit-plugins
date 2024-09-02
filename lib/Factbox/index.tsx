import { Editor, Element, Transforms } from 'slate'
import { type Plugin } from '@ttab/textbit'
import { BookOpenText } from 'lucide-react'
import {
  Factbox as FactboxComponent,
  FactboxTitle
} from './components'
import { actionHandler } from './lib/actionHandler'
import { normalizeFactbox } from './lib/normalizeFactbox'

export const Factbox: Plugin.InitFunction = () => {
  return {
    class: 'block',
    name: 'core/factbox',
    actions: [
      {
        name: 'edit-factbox',
        handler: ({ editor, args }): void => {
          const matches = Array.from(Editor.nodes(editor, {
            at: [],
            mode: 'highest',
            match: n => {
              if (Editor.isEditor(n) || !Element.isElement(n)) {
                return false
              }

              return (n.id === args?.id)
            }
          }))

          const [node, path] = (matches?.length === 1) ? matches[0] : [undefined, undefined]

          console.log(node)

          Transforms.setNodes(
            editor,
            {
              properties: {
                editable: args?.editable as boolean || false
              }
            },
            { at: path }
          )
        }
      },
      {
        name: 'create-factbox',
        title: 'Factbox',
        tool: () => <BookOpenText style={{ width: '1em', height: '1em' }} />,
        hotkey: 'mod+shift+2',
        handler: actionHandler,
        visibility: (element) => {
          return [
            true, // Always visible
            true, // Always enabled
            (element.type === 'core/factbox') // Active when isFactbox
          ]
        }
      }
    ],
    componentEntry: {
      class: 'block',
      component: FactboxComponent,
      constraints: {
        normalizeNode: normalizeFactbox
      },
      children: [
        {
          type: 'title',
          class: 'text',
          component: FactboxTitle
        }
      ]
    }
  }
}
