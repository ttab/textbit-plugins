import { type Plugin } from '@ttab/textbit'
import {
  TableCell,
  Table as TableComponent,
  TableRow
} from './components'
import { consumes } from './lib/consumes'
import { consume } from './lib/consume'

export const Table: Plugin.InitFunction = () => {
  return {
    class: 'block',
    name: 'core/table',
    consumer: {
      consumes,
      consume
    },
    actions: [],
    componentEntry: {
      class: 'block',
      component: TableComponent,
      children: [
        {
          type: 'row',
          class: 'block',
          component: TableRow,
          children: [
            {
              type: 'cell',
              class: 'text',
              constraints: {
                allowBreak: false
              },
              component: TableCell
            }
          ]
        }
      ]
    }
  }
}
