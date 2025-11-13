import type { TBPluginInitFunction} from '@ttab/textbit'
import { Channel, Day, Time, EndTime, Title, TVLWrapper } from './components'
import { Table } from 'lucide-react'
import { actionHandler } from './lib/actionHandler'

export const TVListing: TBPluginInitFunction = (options) => {
  return {
    class: 'block',
    name: 'tt/tv-listing',
    options,
    actions: [
      {
        name: 'tt/tv-listing',
        title: 'Tablåinfo',
        tool: () => <Table style={{ width: '1em', height: '1em' }} />,
        handler: actionHandler,
        visibility: () => {
          return [
            true,
            true,
            false
          ]
        }
      }
    ],
    componentEntry: {
      class: 'block',
      component: TVLWrapper,
      children: [
        {
          type: 'title',
          class: 'text',
          component: Title,
          constraints: {
            allowBreak: false,
            allowSoftBreak: false
          }
        },
        {
          type: 'channel',
          class: 'text',
          component: Channel,
          options,
          constraints: {
            allowBreak: false,
            allowSoftBreak: false
          }
        },
        {
          type: 'day',
          class: 'text',
          component: Day,
          constraints: {
            allowBreak: false,
            allowSoftBreak: false
          }
        },
        {
          type: 'time',
          class: 'text',
          component: Time,
          constraints: {
            allowBreak: false,
            allowSoftBreak: false
          }
        },
        {
          type: 'end_time',
          class: 'text',
          component: EndTime,
          constraints: {
            allowBreak: false,
            allowSoftBreak: false
          }
        }
      ]
    }
  }
}
