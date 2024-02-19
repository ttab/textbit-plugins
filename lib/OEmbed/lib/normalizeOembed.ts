import {
  type Editor,
  type NodeEntry,
  Node,
  Transforms
} from 'slate'
import { TextbitElement } from '@ttab/textbit'


export const normalizeOembed = (editor: Editor, nodeEndtry: NodeEntry): boolean | undefined => {
  const [, path] = nodeEndtry
  const children = Array.from(Node.children(editor, path))

  if (children.length < 2) {
    Transforms.removeNodes(editor, { at: [path[0]] })
    return true
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

    if (n === 1 && !TextbitElement.isOfType(child, 'core/oembed/title')) {
      Transforms.setNodes(
        editor,
        { type: 'core/oembed/text' },
        { at: childPath }
      )
      return true
    }

    if (n > 1) {
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
