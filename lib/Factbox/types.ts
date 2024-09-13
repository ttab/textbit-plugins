export interface FactboxProperties {
  title: string
  text: string
  modified?: string
}

export interface FactboxInterface {
  id: string
  class: 'block'
  type: 'core/factbox'
  properties: FactboxProperties
  children: [
    {
      type: 'core/factbox/title'
      class: 'text'
      children: [{ text: string }]
    },
    {
      type: 'core/factbox/text'
      class: 'text'
      children: [{ text: string }]
    }
  ]
}
