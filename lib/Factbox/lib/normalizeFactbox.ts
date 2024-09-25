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

  if (children.length < 1) {
    Transforms.removeNodes(editor, { at: path })
    return true
  }

  if (!TextbitElement.isOfType(children[0][0], 'core/factbox/title')) {
    Transforms.insertNodes(
      editor,
      {
        id: crypto.randomUUID(),
        class: 'text',
        type: 'core/factbox/title',
        children: [{ text: '' }]
      },
      { at: [...path, 0] }
    )

    return true
  }


  for (let n = 1; n < children.length; n++) {
    const [child, childPath] = children[n]

    if (!TextbitElement.isOfType(child, 'core/text') && !TextbitElement.isOfType(child, 'core/unordered-list')) {
      Transforms.removeNodes(editor, { at: childPath })

      const textContent = Node.string(child)
      if (textContent) {
        Transforms.insertNodes(
          editor,
          {
            type: 'core/text',
            children: [{ text: textContent }]
          },
          { at: childPath }
        )
      }

      return true
    }

    if (TextbitElement.isOfType(child, 'core/text') && child.properties?.type) {
      Transforms.setNodes(
        editor,
        { type: 'core/text', properties: {} },
        { at: childPath }
      )

      return true
    }
  }
}
