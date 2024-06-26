import { type VisualPropertiesInterface } from '../types'

function parseImageId(data: string): string | undefined {
  // Is it a URL?
  if (URL.canParse(data)) {
    const url = new URL(data)

    // Does it have a url parameter?
    const urlParam = url.searchParams.get('url')

    // Value to parse ID from
    const value = urlParam || url.toString()
    return idMatcher(value)
  }

  // Is it JSON? Use the href
  const json = parseJSON(data)
  if (json) {
    return parseImageId(json.href)
  }
}

function idMatcher(value: string): string | undefined {
  // Regex to match SDL ID
  const matcher = /\/media\/image\/(sdl[a-zA-Z0-9-_]+(?=_(Normal|Watermarked)Preview))/i

  const match = value.match(matcher)

  if (match) {
    return match[1]
  }

  // Match if ends with SDL ID
  if (value.includes('sdl')) {
    const id = value.slice(value.indexOf('sdl'))
    if (value.endsWith(id)) {
      return id
    }
  }
}

export function parseJSON(value: string): VisualPropertiesInterface | false {
  try {
    return JSON.parse(value)
  } catch (e) {
    return false
  }
}


export default parseImageId
