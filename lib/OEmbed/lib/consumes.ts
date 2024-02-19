import { type Plugin } from '@ttab/textbit'
import { getOembedUrl } from './getOembedUrl'


export const consumes: Plugin.ConsumesFunction = ({ input }) => {
  const { data, type } = input

  if (!['text/uri-list', 'text/plain'].includes(type)) {
    return [false]
  }

  if (typeof data !== 'string') {
    return [false]
  }

  return [
    !!getOembedUrl(data),
    'core/oembed'
  ]
}
