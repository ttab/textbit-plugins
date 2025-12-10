import type { TBConsumesFunction } from '@ttab/textbit'

export const consumes: TBConsumesFunction = ({ input }) => {
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
