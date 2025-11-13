import type { TBPluginInitFunction } from '@ttab/textbit'

import { consume } from './lib/consume'
import { consumes } from './lib/consumes'
import { normalizeOembed } from './lib/normalizeOembed'
import {
  OembedWrapper,
  OembedVideo,
  OembedTitle
} from './components'

export const OEmbed: TBPluginInitFunction = () => {
  return {
    class: 'block',
    name: 'core/oembed',
    consumer: {
      consumes,
      consume
    },
    componentEntry: {
      component: OembedWrapper,
      class: 'block',
      constraints: {
        normalizeNode: normalizeOembed
      },
      children: [
        {
          type: 'embed',
          class: 'void',
          component: OembedVideo
        },
        {
          type: 'title',
          class: 'text',
          component: OembedTitle
        }
      ]
    }
  }
}
