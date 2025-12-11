import type { TBPluginInitFunction } from '@ttab/textbit'
import type { Element } from 'slate'
import { Text as TextComponent } from './components'
import { getTextStyles } from './textStyles'

export const Text: TBPluginInitFunction = (options) => {
  const placeholder = (element: Element) => {
    switch (element.properties?.role) {
      case 'heading-1':
        return (typeof options?.titleLabel === 'string')
          ? options.titleLabel
          : '¶'
      case 'heading-2':
        return (typeof options?.subTitleLabel === 'string')
          ? options.subTitleLabel
          : '¶'
      default:
        return '¶'
    }
  }

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
