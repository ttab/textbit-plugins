import {
  type Editor,
  type Element
} from 'slate'
import {
  type Plugin,
  TextbitEditor
} from '@ttab/textbit'

import {
  Heading1Icon,
  Heading2Icon,
  ListStartIcon,
  MapIcon,
  TextIcon
} from 'lucide-react'

type TextStyleAction = Plugin.Action & { type?: string }

export const getTextStyles = (options: Plugin.Options): TextStyleAction[] => {
  const textStyles: TextStyleAction[] = [
    {
      name: 'set-h1',
      type: 'h1',
      title: 'Title',
      hotkey: 'mod+1',
      tool: () => <Heading1Icon style={{ width: '1em', height: '1em' }} />,
      handler: ({ editor }) => { convertTextType(editor, 'h1') },
      visibility: (element: Element) => toolVisibility(element, 'h1')
    },
    {
      name: 'set-h2',
      type: 'h2',
      title: 'Subtitle',
      hotkey: 'mod+2',
      tool: () => <Heading2Icon style={{ width: '1em', height: '1em' }} />,
      handler: ({ editor }) => convertTextType(editor, 'h2'),
      visibility: (element: Element) => toolVisibility(element, 'h2')
    },
    {
      name: 'set-preamble',
      type: 'preamble',
      title: 'Preamble',
      hotkey: 'mod+3',
      tool: () => <ListStartIcon style={{ width: '1em', height: '1em' }} />,
      handler: ({ editor }) => convertTextType(editor, 'preamble'),
      visibility: (element: Element) => toolVisibility(element, 'preamble')
    },
    {
      name: 'set-body',
      title: 'Body text',
      hotkey: 'mod+0',
      tool: () => <TextIcon style={{ width: '1em', height: '1em' }} />,
      handler: ({ editor }) => convertTextType(editor),
      visibility: (element: Element) => toolVisibility(element)
    },
    {
      name: 'set-dateline',
      type: 'dateline',
      title: 'Dateline',
      hotkey: undefined,
      tool: () => <MapIcon style={{ width: '1em', height: '1em' }} />,
      handler: ({ editor }) => convertTextType(editor, 'dateline'),
      visibility: (element: Element) => toolVisibility(element, 'dateline')
    }
  ]

  if (Array.isArray(options.styles)) {
    return textStyles.filter(ts => (options.styles as string[]).includes(ts.name))
  }

  return textStyles
}

function toolVisibility(element: Element, subType?: string): [boolean, boolean, boolean] {
  return [
    element.type === 'core/text',
    true,
    element.type === 'core/text' && element?.properties?.type === subType
  ]
}

function convertTextType(editor: Editor, subType?: string): void {
  TextbitEditor.convertToTextNode(editor, 'core/text', subType)
}
