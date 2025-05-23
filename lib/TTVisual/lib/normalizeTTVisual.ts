import {
  Node,
  type Editor,
  type NodeEntry,
  Element,
  Transforms
} from 'slate'
import { TextbitElement } from '@ttab/textbit'

export const normalizeTTVisual = (editor: Editor, nodeEntry: NodeEntry): boolean | undefined => {
  const [, path] = nodeEntry
  const children = Array.from(Node.children(editor, path))

  if (children.length < 4) {
    let hasImage = false
    let hasText = false
    let hasByline = false

    for (const [child] of children) {
      if (!Element.isElement(child)) {
        continue
      }

      if (child.type === 'tt/visual/image') {
        hasImage = true
      }

      if (child.type === 'tt/visual/text') {
        hasText = true
      }

      if (child.type === 'tt/visual/byline') {
        hasByline = true
      }
    }

    if (!hasImage) {
      // If image is gone, delete the whole block
      Transforms.removeNodes(editor, { at: path })
      return true
    } else if (!hasText || !hasByline) {
      // If either text is missing, add empty text node in the right position
      const [addType, atPos] = (!hasByline) ? ['tt/visual/byline', 2] : ['tt/visual/text', 1]
      Transforms.insertNodes(
        editor,
        {
          id: crypto.randomUUID(),
          class: 'text',
          type: addType,
          children: [{ text: '' }]
        },
        { at: [...path, atPos] }
      )
      return true
    }
  }

  let n = 0
  for (const [child, childPath] of children) {
    if (TextbitElement.isBlock(child)) {
      // Unwrap block node children (move text element children upwards in tree)
      Transforms.unwrapNodes(editor, {
        at: childPath,
        split: true
      })
      return true
    }

    if (n === 1 && !TextbitElement.isOfType(child, 'tt/visual/text')) {
      Transforms.setNodes(
        editor,
        { type: 'tt/visual/text' },
        { at: childPath }
      )
      return true
    }

    if (n === 2 && !TextbitElement.isOfType(child, 'tt/visual/byline')) {
      Transforms.setNodes(
        editor,
        { type: 'tt/visual/byline' },
        { at: childPath }
      )
      return true
    }

    if (n > 2) {
      // Excessive nodes are lifted and transformed to text
      Transforms.setNodes(
        editor,
        { type: 'core/text', properties: {} },
        { at: childPath }
      )
      Transforms.liftNodes(
        editor,
        { at: childPath }
      )
      return true
    }
    n++
  }
}
