import type { TBPluginInitFunction } from '@ttab/textbit'
import type { Element } from 'slate'
import { Text as TextComponent } from './components'
import { getTextStyles } from './textStyles'

export const Text: TBPluginInitFunction = (options) => {
  return {
    class: 'text',
    name: 'core/text',
    options,
    componentEntry: {
      class: 'text',
      component: TextComponent,
      placeholder,
      constraints: {
        allowBreak: !options?.singleLine,
        allowSoftBreak: !options?.singleLine
      }
    },
    actions: getTextStyles(options || {})
  }
}

function placeholder(element: Element) {
  switch (element.properties?.role) {
    case 'heading-1':
      return 'Title'
    case 'heading-2':
      return 'Heading'
    default:
      return '¶'
  }
}
