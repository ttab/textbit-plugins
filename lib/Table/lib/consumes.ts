import type { TBConsumesFunction } from '@ttab/textbit'

export const consumes: TBConsumesFunction = ({ input }) => {
  const { type, data } = input

  if (typeof data !== 'string') {
    return [false]
  }

  const types = ['core/table']
  if (types.includes(type)) {
    return [
      true,
      'core/table'
    ]
  }
  return [false]
}
