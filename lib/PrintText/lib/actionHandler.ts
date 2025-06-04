import { Editor, Transforms } from 'slate'
import { TextbitEditor } from '@ttab/textbit'

// @ts-ignore - Type instantiation is excessively deep and possibly infinite
export const actionHandler = ({ editor }: { editor: Editor }): void => {
  const selectedText = TextbitEditor.getSelectedText(editor)

  const node = [{
    id: crypto.randomUUID(),
    class: 'block',
    type: 'tt/print-text',
    children: [
      {
        class: 'text',
        type: 'tt/print-text/text',
        children: [{ text: selectedText || '' }]
      },
      {
        class: 'text',
        type: 'tt/print-text/role',
        children: [{ text: '' }]
      }
    ]
  }]


  // const position = TextbitEditor.position(editor) + (selectedText ? 0 : 1)
  // TextbitEditor.insertAt(editor, position, node)

  Transforms.delete(editor, { at: editor.selection })
  Transforms.insertNodes(editor, node, { at: editor.selection })
}
