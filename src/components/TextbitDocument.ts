import { type Descendant } from 'slate'

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
    type: 'tt/tv-listing',
    id: 'e61e8819-62f8-44ad-810f-364607196364',
    class: 'text',
    children: [
      {
        class: 'text',
        type: 'tt/tv-listing/title',
        children: [{ text: '' }]
      },
      {
        class: 'text',
        type: 'tt/tv-listing/channel',
        children: [{ text: '' }]
      },
      {
        class: 'text',
        type: 'tt/tv-listing/day',
        children: [{ text: '' }]
      },
      {
        class: 'text',
        type: 'tt/tv-listing/time',
        children: [{ text: '' }]
      },
      {
        class: 'text',
        type: 'tt/tv-listing/end_time',
        children: [{ text: '' }]
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
        type: 'core/table/row',
        class: 'block',
        children: [
          {
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
        type: 'core/table/row',
        class: 'block',
        children: [
          {
            type: 'core/table/row/cell',
            class: 'text',
            children: [{ text: `Name` }]
          },
          {
            type: 'core/table/row/cell',
            class: 'text',
            children: [{ text: `City` }]
          }
        ]
      },
      {
        type: 'core/table/row',
        class: 'block',
        children: [
          {
            type: 'core/table/row/cell',
            class: 'text',
            children: [{ text: `Batman` }]
          },
          {
            type: 'core/table/row/cell',
            class: 'text',
            children: [{ text: `Gotham` }]
          }
        ]
      },
      {
        type: 'core/table/row',
        class: 'block',
        children: [
          {
            type: 'core/table/row/cell',
            class: 'text',
            children: [{ text: `Spider-Man` }]
          },
          {
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
        type: 'core/table/row',
        class: 'block',
        children: [
          {
            type: 'core/table/row/cell',
            class: 'text',
            children: [{ text: `Fantastic 4` }]
          }
        ]
      }
    ]
  },
  {
    type: 'core/factbox',
    class: 'block',
    id: '538345e5-bacc-48f9-8ef1-1214443a32da',
    properties: {
      editable: false
    },
    children: [
      {
        type: 'core/factbox/title',
        class: 'text',
        children: [
          { text: 'Facts about facts' }
        ]
      },
      {
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
