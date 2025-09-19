import { TextbitEditor } from '@ttab/textbit'
import { Editor, Transforms } from 'slate'

export const actionHandler = ({ editor }: { editor: Editor }): void => {
  const node = [{
    id: crypto.randomUUID(),
    class: 'block',
    type: 'tt/print-text',
    children: [
      {
        class: 'text',
        type: 'tt/print-text/text',
        children: [{ text: '' }]
      },
      {
        class: 'text',
        type: 'tt/print-text/role',
        children: [{ text: '' }]
      }
    ]
  }]


  if (editor.selection) {
    Transforms.insertNodes(editor, node, { at: editor.selection });
  } else {
    console.warn('No selection found when inserting')
  }

  const position = TextbitEditor.position(editor) + 1

  Transforms.select(editor, {
    anchor: { offset: 0, path: [position, 0, 0] },
    focus: { offset: 0, path: [position, 0, 0] }
  })
}
