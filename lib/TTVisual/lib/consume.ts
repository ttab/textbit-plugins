import { type Plugin } from '@ttab/textbit'
import { type TTVisualInterface, type VisualPropertiesInterface } from '../types'

export const consume: Plugin.ConsumeFunction = async ({ input }): Promise<TTVisualInterface> => {
  if (Array.isArray(input)) {
    throw new Error('VisualEx plugin expected string for consumation, not a list/array')
  }

  if (typeof input.data !== 'string') {
    throw new Error('VisualEx plugin expected string for consumation')
  }


  return createTTVisualNode(await createVisualProperties(input))
}

/**
* Create a TTVisual node
* @param {VisualPropertiesInterface} props
* @returns {TTVisualInterface}
*/
const createTTVisualNode = (props: VisualPropertiesInterface): TTVisualInterface => {
  return {
    id: crypto.randomUUID(),
    class: 'block',
    type: 'tt/visual',
    properties: {
      href: props.href,
      uri: `http://tt.se/media/image/${getSDLID(props.href)}`,
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
      }
    ]
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

/*
* Get SDL ID from URL
* @param {string} url
* @returns {string}
*/
function getSDLID(url: string): string {
  return url.slice(url.indexOf('sdl'))
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

  if (input.data.startsWith('https://tt.se/bild/o/')) {
    const href = getSDLID(input.data)

    const res = await getImageResolution(`http://tt.se/media/image/${href}_WatermarkPreview.jpg`)

    if (!res) {
      throw new Error('Failed to get image resolution')
    }

    const { width, height } = res

    return {
      type: 'tt/picture',
      href: `http://tt.se/media/image/${href}_WatermarkPreview.jpg`,
      uri: `http://tt.se/media/image/${href}`,
      byline: '',
      text: '',
      width,
      height
    }
  }

  return JSON.parse(input.data)
}

