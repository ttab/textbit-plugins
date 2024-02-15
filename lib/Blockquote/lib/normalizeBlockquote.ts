import {
  Transforms,
  Node,
  type Editor,
  type NodeEntry
} from 'slate'
import { TextbitElement } from '@ttab/textbit'
import * as uuid from 'uuid'


export const normalizeBlockquote = (editor: Editor, nodeEntry: NodeEntry): boolean | undefined => {
  const [, path] = nodeEntry
  const children = Array.from(Node.children(editor, path))

  if (children.length === 1) {
    // Ensure there is text, or remove the node entirely
    let textFound = false
    for (const [child] of children) {
      for (const textNode of Node.texts(child)) {
        if (textNode[0].text.trim() !== '') {
          textFound = true
        }
      }
    }

    if (!textFound) {
      Transforms.removeNodes(editor, { at: path })
      return true
    }

    // Add missing body or caption
    const [addType, atPos] = TextbitElement.isOfType(children[0][0], 'core/blockquote/caption') ? ['core/blockquote/body', 0] : ['core/blockquote/caption', 1]

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

  let n = 1
  for (const [child, childPath] of children) {
    if (TextbitElement.isBlock(child) || TextbitElement.isTextblock(child)) {
      // Unwrap block node children (move text element children upwards in tree)
      Transforms.unwrapNodes(editor, {
        at: childPath,
        split: true
      })
      return true
    }

    if (n < children.length && TextbitElement.isText(child) && !TextbitElement.isOfType(child, 'core/blockquote/body')) {
      // Turn unknown text elements to /core/blockquote/body
      Transforms.setNodes(
        editor,
        { type: 'core/blockquote/body' },
        { at: childPath }
      )
      return true
    }

    // Make sure last element is a caption
    if (n === children.length && !TextbitElement.isOfType(child, 'core/blockquote/caption')) {
      Transforms.setNodes(
        editor,
        { type: 'core/blockquote/caption' },
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
    }
    n++
  }
}
