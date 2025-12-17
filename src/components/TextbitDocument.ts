import type { Descendant } from 'slate'

export const TextbitDocument: Descendant[] = [
  {
    type: 'core/text',
    id: '538345e5-bacc-48f9-8ef1-a219891b60eb',
    class: 'text',
    properties: {
      role: 'heading-1'
    },
    children: [
      { text: 'Better music?' }
    ]
  },
  {
    type: 'core/text',
    id: '538345e5-bacc-48f9-9ed2-b219892b51dc',
    class: 'text',
    properties: {
      role: 'preamble'
    },
    children: [
      { text: 'It is one of those days when better music makes all the difference in the world. At least to me, my inner and imaginary friend.' }
    ]
  },
  {
    type: 'core/text',
    id: '538345e5-cadd-4558-9ed2-a219892b51dc',
    class: 'text',
    properties: {
      role: 'vignette'
    },
    children: [
      { text: 'Kalmar' }
    ]
  },
  {
    type: 'core/text',
    id: '538345e5-bacc-48f9-8ef0-1219891b60ef',
    class: 'text',
    children: [
      { text: 'An example paragraph that contains text that is a wee bit ' },
      {
        text: 'stronger',
        'core/bold': true
      },
      {
        text: ' than normal but also text that is somewhat '
      },
      {
        text: 'emphasized',
        'core/italic': true
      },
      { text: ' compared to the normal styled text found elsewhere in the document.' }
    ]
  },
  {
    type: 'core/image',
    id: crypto.randomUUID(),
    class: 'block',
    properties: {
      type: 'image/jpg',
      src: 'https://fastly.picsum.photos/id/534/800/600.jpg?hmac=Y1tfrqoUorsaytGK-alxu5DwWYG9wRbsXuaejW3RIOU',
      title: 'A random image',
      size: 0,
      width: 800,
      height: 600
    },
    children: [
      {
        id: crypto.randomUUID(),
        type: 'core/image/image',
        class: 'void',
        children: [{ text: '' }]
      },
      {
        id: crypto.randomUUID(),
        type: 'core/image/text',
        class: 'text',
        children: [{ text: 'A random image' }]
      }
    ]
  },
  {
    type: 'core/table',
    id: 'f0600160-08ca-4732-8512-52c002e5cb93',
    class: 'block',
    properties: {
      rel: 'table',
      type: 'core/table'
    },
    children: [
      {
        id: crypto.randomUUID(),
        type: 'core/table/row',
        class: 'block',
        children: [
          {
            id: crypto.randomUUID(),
            type: 'core/table/row/cell',
            class: 'text',
            children: [{ text: `Superman` }],
            properties: {
              colspan: '2'
            }
          }
        ]
      },
      {
        id: crypto.randomUUID(),
        type: 'core/table/row',
        class: 'block',
        children: [
          {
            id: crypto.randomUUID(),
            type: 'core/table/row/cell',
            class: 'text',
            children: [{ text: `Name` }]
          },
          {
            id: crypto.randomUUID(),
            type: 'core/table/row/cell',
            class: 'text',
            children: [{ text: `City` }]
          }
        ]
      },
      {
        id: crypto.randomUUID(),
        type: 'core/table/row',
        class: 'block',
        children: [
          {
            id: crypto.randomUUID(),
            type: 'core/table/row/cell',
            class: 'text',
            children: [{ text: `Batman` }]
          },
          {
            id: crypto.randomUUID(),
            type: 'core/table/row/cell',
            class: 'text',
            children: [{ text: `Gotham` }]
          }
        ]
      },
      {
        id: crypto.randomUUID(),
        type: 'core/table/row',
        class: 'block',
        children: [
          {
            id: crypto.randomUUID(),
            type: 'core/table/row/cell',
            class: 'text',
            children: [{ text: `Spider-Man` }]
          },
          {
            id: crypto.randomUUID(),
            type: 'core/table/row/cell',
            class: 'text',
            children: [{ text: `New York` }],
            properties: {
              rowspan: 2
            }
          }
        ]
      },
      {
        id: crypto.randomUUID(),
        type: 'core/table/row',
        class: 'block',
        children: [
          {
            id: crypto.randomUUID(),
            type: 'core/table/row/cell',
            class: 'text',
            children: [{ text: `Fantastic 4` }]
          }
        ]
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    type: 'core/factbox',
    class: 'block',
    properties: {
      editable: false
    },
    children: [
      {
        id: crypto.randomUUID(),
        type: 'core/factbox/title',
        class: 'text',
        children: [
          { text: 'Facts about facts' }
        ]
      },
      {
        id: crypto.randomUUID(),
        type: 'core/factbox/body',
        class: 'block',
        children: [
          {
            type: 'core/text',
            id: '538343b5-badd-48f9-8ef0-1219891b61ea',
            class: 'text',
            children: [
              { text: 'An example factuality with facts about the non factual ' },
              {
                text: 'fact',
                'core/bold': true,
                'core/italic': true
              },
              { text: ' text that describes the ' },
              {
                text: 'emphasized',
                'core/italic': true
              },
              { text: ' facts behind the fact.' }
            ]
          }
        ]
      }
    ]
  },
  {
    type: 'core/text',
    class: 'text',
    id: '538345e5-bacc-48f9-8ef1-1215892b61ed',
    children: [
      { text: 'This, here now is just a regular paragraph that contains some nonsensical writing written by me.' }
    ]
  },
  {
    type: 'core/text',
    id: '538343b5-badd-48f9-8ef0-1219891b60ef',
    class: 'text',
    children: [
      { text: 'An example paragraph that contains text that is a wee bit ' },
      {
        text: 'stronger',
        'core/bold': true,
        'core/italic': true
      },
      { text: ' than normal but also text that is somewhat ' },
      {
        text: 'emphasized',
        'core/italic': true
      },
      { text: ' compared to the normal styled text found elsewhere in the document.' }
    ]
  }
]
