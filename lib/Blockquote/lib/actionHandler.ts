import {
  type Editor,
  Transforms
} from 'slate'
import { TextbitEditor } from '@ttab/textbit'


export const actionHandler = ({ editor }: { editor: Editor }): void => {
  const text = TextbitEditor.getSelectedText(editor)

  const node = [{
    id: crypto.randomUUID(),
    class: 'block',
    type: 'core/blockquote',
    children: [
      {
        type: 'core/blockquote/body',
        class: 'text',
        children: [{ text: text || '' }]
      },
      {
        type: 'core/blockquote/caption',
        class: 'text',
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
