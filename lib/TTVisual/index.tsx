import { type Plugin } from '@ttab/textbit'

import { consume } from './lib/consume'
import { consumes } from './lib/consumes'
import {
  TTVisualWrapper,
  TTVisualImage,
  TTVisualByline,
  TTVisualText,
  TTVisualAltText
} from './components'
import { normalizeTTVisual } from './lib/normalizeTTVisual'

export const TTVisual: Plugin.InitFunction = (options) => {
  return {
    class: 'block',
    name: 'tt/visual',
    consumer: {
      consumes,
      consume
    },
    options,
    componentEntry: {
      component: TTVisualWrapper,
      constraints: {
        normalizeNode: normalizeTTVisual
      },
      class: 'block',
      droppable: true,
      children: [
        {
          type: 'image',
          class: 'void',
          component: TTVisualImage
        },
        {
          type: 'text',
          class: 'text',
          component: TTVisualText
        },
        {
          type: 'byline',
          class: 'text',
          component: TTVisualByline
        },
        {
          type: 'altText',
          class: 'text',
          component: TTVisualAltText
        }
      ]
    }
  }
}
