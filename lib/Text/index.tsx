import { type Plugin } from '@ttab/textbit'
import { Text as TextComponent } from './components'

import { getTextStyles } from './textStyles'


export const Text: Plugin.InitFunction = (options) => {
  return {
    class: 'text',
    name: 'core/text',
    componentEntry: {
      class: 'text',
      component: TextComponent,
      placeholder: '¶', // FIXME: Needs to be a render function for subtypes
      constraints: {
        allowBreak: !options?.singleLine,
        allowSoftBreak: !options?.singleLine
      }
    },
    actions: getTextStyles(options || {})
  }
}
