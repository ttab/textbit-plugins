import type { TBPluginInitFunction } from '@ttab/textbit'
import { consumes } from './lib/consumes'
import { consume } from './lib/consume'

export const LocalizedQuotationMarks: TBPluginInitFunction = () => {
  return {
    class: 'generic',
    name: 'core/localizedquotationmarks',
    consumer: {
      consumes,
      consume
    }
  }
}
