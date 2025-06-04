import {
  type Editor,
  type Element
} from 'slate'
import {
  type Plugin,
  TextbitEditor
} from '@ttab/textbit'

type TextStyleAction = Plugin.Action & { role?: string }

export const getTextStyles = (options: Plugin.Options): TextStyleAction[] => {
  const textStyles: TextStyleAction[] = [
    {
      name: 'set-role',
      title: `${options?.roleLabel}` || 'Role',
      hotkey: undefined,
      tool: () => <span style={{ display: 'flex', alignItems: 'center', textDecoration: 'italic', width: '0.8em', height: '0.8em' }}>Roll</span>,
      handler: ({ editor }) => convertTextType(editor, 'role'),
      visibility: (element: Element) => toolVisibility(element, 'role')
    },
  ]

  if (Array.isArray(options.styles)) {
    return textStyles.filter(ts => (options.styles as string[]).includes(ts.name))
  }

  return textStyles
}

function toolVisibility(element: Element, role?: string): [boolean, boolean, boolean] {
  return [
    ['tt/print-text', 'print-text/set-role'].includes(element.type),
    true,
    ['tt/print-text'].includes(element.type) && element?.properties?.role === role
  ]
}

function convertTextType(editor: Editor, subType?: string): void {
  TextbitEditor.convertToTextNode(editor, 'tt/print-text', subType)
}
