import type { TBConsumesFunction } from '@ttab/textbit'

export const consumes: TBConsumesFunction = ({ input }) => {
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
