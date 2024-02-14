import type {
  Plugin,
  TBEditor,
  TBElement,
  TBText
} from '@ttab/textbit'

import { Link2Icon } from 'lucide-react'

import { Link as LinkComponent } from './components/Link'
import { EditLink as EditLinkComponent } from './components/EditLink'

import './style.css'
import { actionHandler } from './lib/actionHandler'

/**
 * Define Slate CustomTypes to be Textbit types
 */
declare module 'slate' {
  interface CustomTypes {
    Editor: TBEditor
    Element: TBElement
    Text: TBText
  }
}


/**
 * FIXME
 * 1. v When url input has focus, allow ESC to move focus to text content again
 * 2. v When text content has focus, allow opt+k to focus url input
 * 3. v Use another color on underline to indicate error more clearly
 * 4.   Expand to allow editing of more properties
 * 5.   Add InlineChromiumBugfix as is in https://github.com/ianstormtaylor/slate/blob/main/site/examples/inlines.tsx
 */

const Link: Plugin.Definition = {
  class: 'inline',
  name: 'core/link',
  componentEntry: {
    class: 'inline',
    component: LinkComponent
  },
  actions: [{
    tool: [
      () => <Link2Icon style={{ width: '1em', height: '1em' }} />,
      EditLinkComponent
    ],
    hotkey: 'mod+k',
    handler: ({ editor }) => {
      actionHandler(editor, 'core/link')
    }
  }]
}

export { Link }
