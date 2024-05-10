import { type Plugin } from '@ttab/textbit'
import { consumes } from './lib/consumes'
import { consume } from './lib/consume'

export const LocalizedQuotationMarks: Plugin.InitFunction = () => {
  return {
    class: 'generic',
    name: 'core/localizedquotationmarks',
    consumer: {
      consumes,
      consume
    }
  }
}
