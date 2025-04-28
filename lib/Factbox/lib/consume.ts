import type { Plugin } from '@ttab/textbit'

export const consume: Plugin.ConsumeFunction = async ({ input }) => {
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
* @param {FactboxInterface} input
* @returns {FactboxInterface}
*/
const createFactboxNode = (input: Plugin.Resource): Plugin.Resource => {
  const { text, title, modified, id, original_version, original_updated, locally_changed } = JSON.parse(input.data as string)

  return {
    ...input,
    data: {
      id: crypto.randomUUID(),
      class: 'block',
      type: 'core/factbox',
      properties: {
        title,
        text,
        modified,
        id,
        original_id: id,
        original_updated,
        original_version,
        locally_changed,
        rel: 'factbox',
        type: 'core/factbox'
      },
      children: [
        {
          type: 'core/factbox/title',
          class: 'text',
          children: [{ text: title }]
        },
        {
          type: 'core/factbox/body',
          class: 'text',
          children: [{
            type: 'core/text',
            class: 'text',
            children: [{ text: text }]
          }]
        }
      ]
    }
  }
}
