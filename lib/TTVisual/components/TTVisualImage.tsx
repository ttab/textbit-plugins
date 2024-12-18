import { type Plugin } from '@ttab/textbit'
import { Element } from 'slate'

export const TTVisualImage = ({ children, rootNode }: Plugin.ComponentProps): JSX.Element => {
  const { properties = { href: '' } } = Element.isElement(rootNode) ? rootNode : {}
  const href = properties.href as string

  return (
    <div contentEditable={false} draggable={false}>
      <div className='overflow-hidden bg-gray-100'>
        <img width='100%' src={href} className='max-h-96 object-contain' />
      </div>
      {children}
    </div>
  )
}
