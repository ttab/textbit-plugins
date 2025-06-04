import type { Plugin } from '@ttab/textbit'

import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon
} from 'lucide-react'
import { actionHandler } from '../PrintText/lib/actionHandler'

const Bold: Plugin.InitFunction = () => {
  return {
    class: 'leaf',
    name: 'core/bold',
    actions: [{
      name: 'toggle-bold',
      tool: () => <BoldIcon style={{ width: '0.8em', height: '0.8em' }} />,
      hotkey: 'mod+b',
      handler: () => true
    }],
    getStyle: () => {
      return 'font-bold'
    }
  }
}
const Italic: Plugin.InitFunction = () => {
  return {
    class: 'leaf',
    name: 'core/italic',
    actions: [{
      name: 'toggle-italic',
      tool: () => <ItalicIcon style={{ width: '0.8em', height: '0.8em' }} />,
      hotkey: 'mod+i',
      handler: () => true
    }],
    getStyle: () => {
      return 'italic'
    }
  }
}

const Underline: Plugin.InitFunction = () => {
  return {
    class: 'leaf',
    name: 'core/underline',
    actions: [{
      name: 'toggle-underline',
      hotkey: 'mod+u',
      tool: () => <UnderlineIcon style={{ width: '0.8em', height: '0.8em' }} />,
      handler: () => true
    }],
    getStyle: () => {
      return 'underline'
    }
  }
}

const Role: Plugin.InitFunction = () => {
  return {
    class: 'leaf',
    name: 'print-text/role',
    actions: [{
      name: 'set-role',
      hotkey: undefined,
      tool: () => <div className='text-xs'>Roll</div>,
      handler: actionHandler
    }]
  }
}

export {
  Bold,
  Italic,
  Underline,
  Role
}
