import { type Plugin } from '@ttab/textbit'
import { Element } from 'slate'

export const TTVisualImage = ({ children, attributes, rootNode }: Plugin.ComponentProps): JSX.Element => {
  const { properties = { href: '' } } = Element.isElement(rootNode) ? rootNode : {}
  const href = properties.href as string

  return (
    <div contentEditable={false} {...attributes} draggable={false}>
      <div className='overflow-hidden'>
        <img width='100%' src={href} />
      </div>
      {children}
    </div>
  )
}
