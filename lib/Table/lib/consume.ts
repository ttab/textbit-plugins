import { type Plugin } from '@ttab/textbit'

export const consume: Plugin.ConsumeFunction = async ({ input }) => {
  if (Array.isArray(input)) {
    throw new Error('Table plugin expected string for consumption, not a list/array')
  }

  if (typeof input !== 'string') {
    throw new Error('Table plugin expected string for consumption')
  }

  return createTableNode(input)
}

/**
* Create a table node
* @param {TableInterface} input
* @returns {TableInterface}
*/
const createTableNode = (input: Plugin.Resource): Plugin.Resource => {
  const { text } = JSON.parse(input.data as string)
  return {
    ...input,
    data: {
      id: crypto.randomUUID(),
      class: 'block',
      type: 'core/table',
      properties: {
        type: 'core/table',
        rel: 'table',
        text: text
      },
      children: [
        {
          type: 'core/table/row',
          class: 'block',
          children: [
            {
              type: 'core/table/row/cell',
              class: 'text',
              children: [
                { text: text }
              ]
            }
          ]
        }
      ]
    },
  }
}
