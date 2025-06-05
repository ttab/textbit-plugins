import { type Plugin } from '@ttab/textbit'
import { PrintText as PrintTextComponent } from './components'
import { actionHandler } from './lib/actionHandler'
import { Text } from 'lucide-react'
import { TextRole } from './components/TextRole'
import { Text as TextComponent } from './components/Text'
import { normalizePrintText } from './lib/normalizePrintText'

export const PrintText: Plugin.InitFunction = (options) => {
  return {
    class: 'block',
    name: 'tt/print-text',
    options,
    
    actions: [
      {
        name: 'tt/print-text',
        title: 'Print-text',
        tool: () => <Text style={{ width: '1em', height: '1em' }} />,
        handler: actionHandler,
        visibility: () => [true, true, false]
      }
    ],
    componentEntry: {
      class: 'block',
      component: PrintTextComponent,
      constraints: {
        normalizeNode: normalizePrintText
      },
      children: [
        {
          type: 'text',
          class: 'text',
          component: TextComponent
        },
        {
          type: 'role',
          class: 'text',
          component: TextRole
        }
      ]
    }
  }
}
