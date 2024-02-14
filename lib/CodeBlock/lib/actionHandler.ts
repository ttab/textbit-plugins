import { Editor, Transforms } from 'slate'
import {
  TextbitEditor,
  TextbitElement,
  TBElement,
  TBEditor
} from '@ttab/textbit'
import * as uuid from 'uuid'

const PLUGIN_NAME = 'dotvoid/codeblock'

export const actionHandler = (editor: TBEditor, typeName: string) => {
  const isActive = TextbitEditor.includes(editor, typeName)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n)
      && TextbitElement.isElement(n)
      && n.type === PLUGIN_NAME,
    split: true
  })

  const newProperties: Partial<TBElement> = {
    type: isActive ? 'core/text' : `${typeName}/body`,
    properties: {}
  }

  Transforms.setNodes(editor, newProperties, {
    match: (n) => {
      return !Editor.isEditor(n) &&
        TextbitElement.isElement(n) &&
        n.class === 'text'
    }
  })

  if (!isActive) {
    Transforms.wrapNodes(editor, {
      id: uuid.v4(),
      class: 'text',
      type: PLUGIN_NAME,
      children: []
    })
  }
}
