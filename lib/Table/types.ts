export interface TableProperties {
  rel: 'table'
  type?: string
  text: string
}

export interface TableInterface {
  id: string
  class: 'block'
  type: 'core/table'
  properties: TableProperties
  children: [
    {
      type: 'core/table/row'
      class: 'block'
      children: [{
        type: 'core/table/row/cell'
        class: 'text'
        children: [{ text: string }]
      }]
    }
  ]
}
