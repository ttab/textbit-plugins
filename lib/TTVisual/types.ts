export interface VisualPropertiesInterface {
  byline: string
  text: string
  href: string
  uri: string
  rel?: string
  height: number
  width: number
  type: 'tt/picture'
}

export interface TTVisualInterface {
  id: string
  class: 'block'
  type: 'tt/visual'
  properties: VisualPropertiesInterface
  children: [
    {
      type: 'tt/visual/image'
      class: 'text'
      children: [{ text: string }]
    },
    {
      type: 'tt/visual/text'
      class: 'text'
      children: [{ text: string }]
    },
    {
      type: 'tt/visual/byline'
      class: 'text'
      children: [{ text: string }]
    }
  ]
}
