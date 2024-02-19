import {
  Node,
  type Editor,
  type NodeEntry,
  Element,
  Transforms
} from 'slate'
import { TextbitElement } from '@ttab/textbit'
import * as uuid from 'uuid'


export const normalizeImage = (editor: Editor, nodeEntry: NodeEntry): boolean | undefined => {
  const [, path] = nodeEntry
  const children = Array.from(Node.children(editor, path))

  if (children.length < 3) {
    let hasAltText = false
    let hasText = false
    let hasImage = false

    for (const [child] of children) {
      if (!Element.isElement(child)) {
        continue
      }

      if (child.type === 'core/image/image') {
        hasImage = true
      }

      if (child.type === 'core/image/altText') {
        hasAltText = true
      }

      if (child.type === 'core/image/text') {
        hasText = true
      }
    }

    if (!hasImage) {
      // If image is gone, delete the whole block
      Transforms.removeNodes(editor, { at: path })
      return true
    } else if (!hasText || !hasAltText) {
      // If either text is missing, add empty text node in the right position
      const [addType, atPos] = (!hasAltText) ? ['core/image/altText', 2] : ['core/image/text', 1]
      Transforms.insertNodes(
        editor,
        {
          id: uuid.v4(),
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
    if (TextbitElement.isBlock(child) || TextbitElement.isTextblock(child)) {
      // Unwrap block node children (move text element children upwards in tree)
      Transforms.unwrapNodes(editor, {
        at: childPath,
        split: true
      })
      return true
    }

    if (n === 1 && !TextbitElement.isOfType(child, 'core/image/text')) {
      Transforms.setNodes(
        editor,
        { type: 'core/image/text' },
        { at: childPath }
      )
      return true
    }

    if (n === 2 && !TextbitElement.isOfType(child, 'core/image/altText')) {
      Transforms.setNodes(
        editor,
        { type: 'core/image/altText' },
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
