import {
  Transforms,
  Node,
  type Editor,
  type NodeEntry
} from 'slate'
import { TextbitElement } from '@ttab/textbit'


export const normalizeFactbox = (editor: Editor, nodeEntry: NodeEntry): boolean | undefined => {
  const [, path] = nodeEntry
  const children = Array.from(Node.children(editor, path))

  if (!TextbitElement.isOfType(children[0][0], 'core/factbox/title')) {
    Transforms.insertNodes(
      editor,
      {
        class: 'text',
        type: 'core/factbox/title',
        children: [{ text: '' }]
      },
      { at: [...path, 0] }
    )

    return true
  }

  const afterTitle = children.slice(1)
  const bodyIndex = afterTitle.findIndex(([n]) => TextbitElement.isOfType(n, 'core/factbox/body'))
  const hasBody = bodyIndex !== -1

  if (!hasBody) {
    const bodyChildren = afterTitle.map(([n]) => n)

    // Remove everything after the title
    for (let i = children.length - 1; i > 0; i--) {
      Transforms.removeNodes(editor, { at: [...path, i] })
    }

    // Insert one body with all collected nodes or a new body with empty text
    Transforms.insertNodes(
      editor,
      {
        class: 'text',
        type: 'core/factbox/body',
        children: bodyChildren.length
          ? bodyChildren
          : [{
            type: 'core/text',
            children: [{ text: '' }]
          }]
      },
      { at: [...path, 1] }
    )

    return true
  }
}
