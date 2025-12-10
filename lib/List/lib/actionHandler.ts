import {
  type Editor,
  type Element,
  Transforms
} from 'slate'

import { TextbitEditor, TextbitElement } from '@ttab/textbit'

export const actionHandler = (editor: Editor, type: string): void => {
  const listType = ['core/unordered-list', 'core/ordered-list'].includes(type) ? type : 'core/unordered-list'
  const isActive = TextbitEditor.includes(editor, listType)

  Transforms.unwrapNodes(editor, {
    match: (n) => !TextbitEditor.isEditor(n) && TextbitElement.isElement(n) && ['core/unordered-list', 'core/ordered-list'].includes(n.type),
    split: true
  })

  const newProperties: Partial<Element> = {
    type: isActive ? 'core/text' : `${listType}/list-item`,
    properties: {}
  }

  Transforms.setNodes<Element>(editor, newProperties, {
    match: (n) => {
      return !TextbitEditor.isEditor(n) && TextbitElement.isElement(n) && n.class === 'text'
    }
  })

  if (!isActive) {
    Transforms.wrapNodes(editor, {
      id: crypto.randomUUID(),
      class: 'text',
      type: listType,
      children: []
    })
  }
}
