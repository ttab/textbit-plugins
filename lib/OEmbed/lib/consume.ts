import type { Plugin } from '@ttab/textbit'
import { getOembedUrl } from './getOembedUrl'


export const consume: Plugin.ConsumeFunction = async ({ input }) => {
  if (Array.isArray(input)) {
    console.warn('Oembed plugin expected string for consumation, not a list/array')
    return
  }

  if (typeof input.data !== 'string') {
    console.warn('Oembed plugin expected string for consumation, wrong indata')
    return
  }

  return createOembedNode(input)
  // return oEmbed ? createOembedNode(oEmbed) : undefined
}


const createOembedNode = async (input: Plugin.Resource): Promise<Plugin.Resource | undefined> => {
  const props = await fetchOembed(input.data as string)
  if (!props) {
    return
  }

  return {
    ...input,
    data: {
      id: crypto.randomUUID(),
      class: 'block',
      type: 'core/oembed',
      properties: {
        type: props.type,
        provider_name: props.provider_name,
        original_url: props.original_url,
        url: '',
        src: props.src,
        title: props.title,
        html: props.html,
        width: props.width,
        height: props.height,
        thumbnail_url: props.thumbnail_url || '',
        thumbnail_width: props.thumbnail_width || 0,
        thumbnail_height: props.thumbnail_height || 0
      },
      children: [
        {
          type: 'core/oembed/embed',
          class: 'text',
          children: [{ text: '' }]
        },
        {
          type: 'core/oembed/title',
          class: 'text',
          children: [{ text: props.title }]
        }
      ]
    }
  }
}


const fetchOembed = async (url: string): Promise<Record<string, string> | undefined> => {
  const oembedUrl = getOembedUrl(url)
  if (!oembedUrl) {
    return
  }

  try {
    const response = await fetch(`${oembedUrl}${encodeURI(url)}`)
    const obj = await response.json()

    if (!obj?.html) {
      return
    }

    let src = ''
    let html = obj.html

    // YouTube and Vimeo is better to extract and create your own iframe
    if (obj.provider_name === 'YouTube' || obj.provider_name === 'Vimeo') {
      const matches = obj.html.match(/src="([^"]*)"/) || []
      src = matches?.length === 2 ? matches[1] : ''
    }

    // TikToks html/js does not work, ignore it and use thumbnail
    if (obj.provider_name === 'TikTok') {
      html = ''
    }

    return {
      type: obj.type, // Required
      original_url: url, // Internal, not part of oembed spec
      title: obj.title || '', // Optional
      url: obj.url || '', // Required for photo, otherwise optional)
      src, // Internal iframe hack not part of embed
      html, // Required for video, otherwise optional
      width: obj.width, // Required
      height: obj.height, // Required
      provider_name: obj.provider_name, // Required
      thumbnail_url: obj.thumbnail_url || '', // Optional
      thumbnail_width: obj.thumbnail_width || 0, // Optional
      thumbnail_height: obj.thumbnail_height || 0 // Optional
    }
  } catch (ex) {
    console.warn(`Could not fetch Oembed from ${url}`, ex)
  }
}
