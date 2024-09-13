import { type Plugin } from '@ttab/textbit'

export const consumes: Plugin.ConsumesFunction = ({ input }) => {
  const { type, data } = input

  if (typeof data !== 'string') {
    return [false]
  }

  const types = ['core/factbox']
  if (types.includes(type)) {
    return [
      true,
      'core/factbox'
    ]
  }

  return [false]
}
