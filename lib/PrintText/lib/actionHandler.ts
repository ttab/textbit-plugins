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

  Transforms.insertNodes(editor, node, { at: editor.selection })
}
