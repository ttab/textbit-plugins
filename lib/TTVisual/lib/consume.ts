import type { Plugin } from '@ttab/textbit'
import type { VisualPropertiesInterface } from '../types'
import parseImageId, { parseJSON } from './parseImageId'

export const consume: Plugin.ConsumeFunction = async ({ input }) => {
  if (Array.isArray(input)) {
    throw new Error('VisualEx plugin expected string for consumation, not a list/array')
  }

  if (typeof input.data !== 'string') {
    throw new Error('VisualEx plugin expected string for consumation')
  }


  return createTTVisualNode(input)
}

/**
* Create a TTVisual node
* @param {VisualPropertiesInterface} props
* @returns {TTVisualInterface}
*/
const createTTVisualNode = async (input: Plugin.Resource): Promise<Plugin.Resource> => {
  const props = await createVisualProperties(input)

  return {
    ...input,
    data: {
      id: crypto.randomUUID(),
      class: 'block',
      type: 'tt/visual',
      properties: {
        href: props.href,
        proxy: props.proxy,
        uri: `http://tt.se${parseImageId(props.href)}`,
        rel: props.rel || 'self',
        text: props.text,
        byline: props.byline,
        width: props.width,
        height: props.height,
        type: 'tt/picture'
      },
      children: [
        {
          type: 'tt/visual/image',
          class: 'block',
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
        }
      ]
    }
  }
}

/**
* Get image resolution without downloading the image
* @param {string} url
* @returns {Promise<{ width: number, height: number } | null>}
* @throws {Error}
*/
const getImageResolution = async (url: string): Promise<{ width: number, height: number } | null> => {
  return await new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    img.src = url
  })
}

/**
* Create visual properties depending on input
* @param {Plugin.Resource} input
* @returns {Promise<VisualPropertiesInterface>}
* @throws {Error}
*/
const createVisualProperties = async (input: Plugin.Resource): Promise<VisualPropertiesInterface> => {
  if (typeof input.data !== 'string') {
    throw new Error('VisualEx plugin expected string for consumation')
  }

  const json = parseJSON(input.data)

  if (json) {
    return json
  }

  const id = parseImageId(input.data)

  const res = await getImageResolution(`https://tt.se/media/image/${id}_WatermarkPreview.jpg`)

  if (!res) {
    throw new Error('Failed to get image resolution')
  }

  const { width, height } = res

  return {
    type: 'tt/picture',
    href: `http://tt.se/media/image/${id}_WatermarkPreview.jpg`,
    uri: `http://tt.se/media/image/${id}`,
    byline: '',
    text: '',
    width,
    height
  }
}
