import { Plugin } from '@ttab/textbit'

import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon
} from 'lucide-react'

import './style.css'

const Bold: Plugin.Definition = {
  class: 'leaf',
  name: 'core/bold',
  actions: [{
    tool: () => <BoldIcon style={{ width: '1em', height: '1em' }} />,
    hotkey: 'mod+b',
    handler: () => true
  }]
}

const Italic: Plugin.Definition = {
  class: 'leaf',
  name: 'core/italic',
  actions: [{
    tool: () => <ItalicIcon style={{ width: '1em', height: '1em' }} />,
    hotkey: 'mod+i',
    handler: () => true
  }]
}

const Underline: Plugin.Definition = {
  class: 'leaf',
  name: 'core/underline',
  actions: [{
    hotkey: 'mod+u',
    tool: () => <UnderlineIcon style={{ width: '1em', height: '1em' }} />,
    handler: () => true
  }]
}

export {
  Bold,
  Italic,
  Underline
}
