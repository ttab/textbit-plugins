import { type Plugin } from '@ttab/textbit'
import {
  Factbox as FactboxComponent,
  FactboxTitle
} from './components'
import { actionHandler } from './lib/actionHandler'
import { normalizeFactbox } from './lib/normalizeFactbox'
import { BookOpenText } from 'lucide-react'
import { Transforms } from 'slate'


export const Factbox: Plugin.InitFunction = () => {
  return {
    class: 'block',
    name: 'core/factbox',
    actions: [
      {
        name: 'edit-factbox',
        handler: ({ editor, args }): void => {
          alert(args?.editable)
          // FIXME: Make sure we can find the path/node
          // Transforms.setNodes(
          //   editor,
          //   {
          //     properties: {
          //       editable: args?.editable as boolean || false
          //     }
          //   },
          //   { at: path }
          // )
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
