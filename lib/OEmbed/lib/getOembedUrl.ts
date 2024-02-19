import { CONFIG } from '../config'

export const getOembedUrl = (url: string): string | undefined => {
  const cleanUrl = url.replace(/^https?:\/\/(www.)?/, '')

  return CONFIG.supported.find(s => cleanUrl.startsWith(s.url))?.endpoint || undefined
}
