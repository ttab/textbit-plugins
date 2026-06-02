import {
  type Editor,
  Element,
  type NodeEntry,
  Node,
  Transforms
} from 'slate'
import { TextbitElement } from '@ttab/textbit'

// Types this normalizer is allowed to leave alone (the schema-defined
// children of tt/visual). Anything else that ends up nested at this level
// — e.g. an unrelated block dropped/pasted inside — is unwrapped to keep
// the structure flat. The earlier, looser rule unwrapped *every* block
// child, which destroyed valid schema children when their class was wrong.
const SCHEMA_CHILD_TYPES = new Set([
  'tt/visual/image',
  'tt/visual/text',
  'tt/visual/byline'
])

export const normalizeTTVisual = (editor: Editor, nodeEntry: NodeEntry): boolean | undefined => {
  const [, path] = nodeEntry

  for (const [child, childPath] of Node.children(editor, path)) {
    if (
      Element.isElement(child)
      && TextbitElement.isBlock(child)
      && !SCHEMA_CHILD_TYPES.has(child.type)
    ) {
      Transforms.unwrapNodes(editor, {
        at: childPath,
        split: true
      })
      return true
    }
  }
}
