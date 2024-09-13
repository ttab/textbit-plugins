import { type Plugin } from '@ttab/textbit'
import { type FactboxInterface } from '../types'

export const consume: Plugin.ConsumeFunction = async ({ input }): Promise<FactboxInterface> => {
  if (Array.isArray(input)) {
    throw new Error('Factbox plugin expected string for consumation, not a list/array')
  }

  if (typeof input.data !== 'string') {
    throw new Error('Factbox plugin expected string for consumation')
  }

  return createFactboxNode(input)
}

/**
* Create a Factbox node
* @param {FactboxInterface} props
* @returns {FactboxInterface}
*/
const createFactboxNode = (input: { data: string }): FactboxInterface => {
  const { data } = input
  const { text, title, modified } = JSON.parse(data)
  return {
    id: crypto.randomUUID(),
    class: 'block',
    type: 'core/factbox',
    properties: {
      title,
      text,
      modified
    },
    children: [
      {
        type: 'core/factbox/title',
        class: 'text',
        children: [{ text: title }]
      },
      {
        type: 'core/factbox/text',
        class: 'text',
        children: [{ text }]
      }
    ]
  }
}
