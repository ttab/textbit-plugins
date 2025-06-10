import {
  type Editor,
  Transforms
} from 'slate'
import { TextbitEditor } from '@ttab/textbit'


export const actionHandler = ({ editor,  }: { editor: Editor }): void => {
  const text = TextbitEditor.getSelectedText(editor)

    const node = [{
      id: crypto.randomUUID(),
      class: 'block',
      type: 'tt/tv-listing',
      properties: {
        channel: '',
        uri: ''
      },
      children: [
        {
          class: 'text',
          type: 'tt/tv-listing/title',
          children: [{ text: '' }]
        },
        {
          class: 'text',
          type: 'tt/tv-listing/channel',
          children: []
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
    }]

  const position = TextbitEditor.position(editor) + (text ? 0 : 1)
  TextbitEditor.insertAt(editor, position, node)

  const atChild = text ? 0 : 1
  Transforms.select(editor, {
    anchor: { offset: 0, path: [position, atChild, 0] },
    focus: { offset: 0, path: [position, atChild, 0] }
  })
}