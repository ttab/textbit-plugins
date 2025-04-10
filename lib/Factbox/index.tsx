import { Editor, Element, Transforms } from 'slate'
import { type Plugin } from '@ttab/textbit'
import {
  Factbox as FactboxComponent,
  FactboxTitle
} from './components'
import { normalizeFactbox } from './lib/normalizeFactbox'
import { consumes } from './lib/consumes'
import { consume } from './lib/consume'

export const Factbox: Plugin.InitFunction = (options) => {

  return {
    class: 'block',
    name: 'core/factbox',
    options,
    consumer: {
      consumes,
      consume
    },
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
                editable: args?.editable as boolean || false,
                id: args?.id as string,
                original_updated: args?.original_updated as string,
                original_version: args?.original_version as string,
                locally_changed: args?.locally_changed as string,
                original_id: args?.original_id as string
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
          component: FactboxTitle,
          constraints: {
            allowBreak: false
          }
        }
      ]
    }
  }
}
