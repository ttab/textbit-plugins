import * as uuid from 'uuid'
import { type Plugin } from '@ttab/textbit'
import { type TTVisualInterface, type VisualPropertiesInterface } from '../types'

export const consume: Plugin.ConsumeFunction = async ({ input }): Promise<TTVisualInterface> => {
  if (Array.isArray(input)) {
    throw new Error('VisualEx plugin expected string for consumation, not a list/array')
  }

  if (typeof input.data !== 'string') {
    throw new Error('VisualEx plugin expected string for consumation')
  }

  let href
  if (input.data.startsWith('https://tt.se/bild/o/')) {
    href = input.data.slice(input.data.indexOf('sdl'))
  }

  const json: VisualPropertiesInterface = href
    ? {
        href: `http://tt.se/media/image/${href}_WatermarkPreview.jpg`,
        byline: '',
        text: '',
        altText: ''
      }
    : JSON.parse(input.data)

  return createTTVisualNode(json)
}

const createTTVisualNode = (props: VisualPropertiesInterface): TTVisualInterface => {
  return {
    id: uuid.v4(),
    class: 'block',
    type: 'tt/visual',
    properties: {
      href: props.href,
      text: props.text,
      byline: props.byline,
      altText: props.altText
    },
    children: [
      {
        type: 'tt/visual/image',
        class: 'text',
        children: [{ text: props.href }]
      },
      {
        type: 'tt/visual/text',
        class: 'text',
        children: [{ text: props.text }]
      },
      {
        type: 'tt/visual/byline',
        class: 'text',
        children: [{ text: props.byline }]
      },
      {
        type: 'tt/visual/altText',
        class: 'text',
        children: [{ text: props.altText }]
      }
    ]
  }
}

