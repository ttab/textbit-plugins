import { Editor, Element, Transforms } from 'slate'
import { type Plugin } from '@ttab/textbit'
import {
  Factbox as FactboxComponent,
  FactboxTitle
} from './components'
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
              return (!Editor.isEditor(n) && Element.isElement(n)) ? n.id === args?.id : false
            }
          }))

          const [, path] = (matches?.length === 1) ? matches[0] : [undefined, undefined]
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
