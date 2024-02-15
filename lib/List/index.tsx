import type {
  TBEditor,
  TBElement,
  TBText
} from '@ttab/textbit'

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

export { BulletList } from './BulletList'
export { NumberList } from './NumberList'
