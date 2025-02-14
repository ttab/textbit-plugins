import { type Plugin } from '@ttab/textbit'

export const consumes: Plugin.ConsumesFunction = ({ input }) => {
  const { data, type } = input
  
  if (type !== 'text/plain') {
    return [false]
  }

  // Handle simple dash, single and double quotes
  if (data !== '\'' && data !== '"' && data !== '-') {
    return [false]
  }

  return [true, 'text/plain']
}
