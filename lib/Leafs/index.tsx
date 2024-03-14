import type { Plugin } from '@ttab/textbit'

import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon
} from 'lucide-react'

const Bold: Plugin.LeafDefinition = {
  class: 'leaf',
  name: 'core/bold',
  actions: [{
    tool: () => <BoldIcon style={{ width: '0.8em', height: '0.8em' }} />,
    hotkey: 'mod+b',
    handler: () => true
  }],
  getStyle: () => {
    return 'font-bold'
  }
}

const Italic: Plugin.LeafDefinition = {
  class: 'leaf',
  name: 'core/italic',
  actions: [{
    tool: () => <ItalicIcon style={{ width: '0.8em', height: '0.8em' }} />,
    hotkey: 'mod+i',
    handler: () => true
  }],
  getStyle: () => {
    return 'italic'
  }
}

const Underline: Plugin.LeafDefinition = {
  class: 'leaf',
  name: 'core/underline',
  actions: [{
    hotkey: 'mod+u',
    tool: () => <UnderlineIcon style={{ width: '0.8em', height: '0.8em' }} />,
    handler: () => true
  }],
  getStyle: () => {
    return 'underline'
  }
}

export {
  Bold,
  Italic,
  Underline
}
