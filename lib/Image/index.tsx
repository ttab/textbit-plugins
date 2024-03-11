import { type Plugin } from '@ttab/textbit'
import { ImageIcon } from 'lucide-react'

import {
  Figure,
  FigureImage,
  FigureText,
  FigureAltText
} from './components'
import { consume } from './lib/consume'
import { consumes } from './lib/consumes'
import { normalizeImage } from './lib/normalizeImage'
import { actionHandler } from './lib/actionHandler'

export const Image: Plugin.Definition = {
  class: 'block',
  name: 'core/image',
  consumer: {
    consumes,
    consume
  },
  actions: [
    {
      title: 'Image',
      tool: () => <ImageIcon style={{ width: '1em', height: '1em' }} />,
      handler: actionHandler,
      visibility: () => {
        return [
          true, // Always visible
          true, // Always enabled
          false // Never active
        ]
      }
    }
  ],
  componentEntry: {
    class: 'block',
    component: Figure,
    constraints: {
      normalizeNode: normalizeImage
    },
    children: [
      {
        type: 'image',
        class: 'void',
        component: FigureImage
      },
      {
        type: 'altText',
        class: 'text',
        component: FigureAltText
      },
      {
        type: 'text',
        class: 'text',
        component: FigureText
      }
    ]
  }
}
