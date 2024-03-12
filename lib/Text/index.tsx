import { type Plugin } from '@ttab/textbit'
import { Text as TextComponent } from './components'

import { textStyles } from './textStyles'


export const Text: Plugin.Definition = {
  class: 'text',
  name: 'core/text',
  componentEntry: {
    class: 'text',
    component: TextComponent,
    placeholder: '¶' // FIXME: Needs to be a render function for subtypes,
  },
  actions: textStyles
}
