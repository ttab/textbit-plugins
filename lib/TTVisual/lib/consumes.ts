import { type Plugin } from '@ttab/textbit'

export const consumes: Plugin.ConsumesFunction = ({ input }) => {
  const { type, data, source } = input

  if (typeof data !== 'string') {
    return [false]
  }

  if ((!['tt/visual', 'text/plain'].includes(type))) {
    return [false]
  }

  const imageUrlRegex = /https:\/\/tt\.se\/bild\/o\/[A-Za-z0-9-%_]*sdl[A-Za-z0-9%_-]+$/i
  const regexMatches = imageUrlRegex.test(data)

  const mediaRegex = /\/media\/image\/sdl[A-Za-z0-9\W_]+$/i
  const dropDataRegexMatches = mediaRegex.test(data)

  if ((data.includes('https://tt.se/bild/o/') && regexMatches) || (source === 'drop' && dropDataRegexMatches)) {
    return [
      true,
      'tt/visual'
    ]
  }

  return [false]
}
