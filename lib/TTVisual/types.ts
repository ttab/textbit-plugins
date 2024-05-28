export interface VisualPropertiesInterface {
  byline: string
  text: string
  href: string
  altText: string
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
    },
    {
      type: 'tt/visual/altText'
      class: 'text'
      children: [{ text: string }]
    }
  ]
}
