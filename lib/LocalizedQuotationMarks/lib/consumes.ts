import { type Plugin } from '@ttab/textbit'

export const consumes: Plugin.ConsumesFunction = ({ input }) => {
  const { data, type } = input
  if (type !== 'text/plain') {
    return [false]
  }

  // For now, only handle single and double "computer" quotes when typing
  if (data !== '\'' && data !== '"') {
    return [false]
  }

  return [true, 'text/plain']
}
