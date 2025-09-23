export interface TTVisualInterface {
  id: string
  class: 'block'
  type: 'core/image'
  properties: {
    type: string
    src: string
    title: string
    size: number
    width: number
    height: number
  }
  children: [
    {
      type: 'core/image/image'
      children: [{ text: '' }]
    },
    {
      type: 'core/image/text'
      class: 'text'
      children: [{ text: string }]
    }
  ]
}
