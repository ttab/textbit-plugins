import { type Plugin } from '@ttab/textbit'
import { Element } from 'slate'

export const TTVisualImage = ({ children, rootNode }: Plugin.ComponentProps): JSX.Element => {
  const { properties = { href: '' } } = Element.isElement(rootNode) ? rootNode : {}
  const href = properties.href as string
  // Property added either when adding a tt/visual or when transforming
  // This volatile and will only be added to the collaborative state, _not_ persisted.
  const proxy = properties.proxy as string

  return (
    <div contentEditable={false} draggable={false}>
      <div className='overflow-hidden bg-gray-100'>
        <img width='100%' src={proxy || href} className='max-h-96 object-contain' />
      </div>
      {children}
    </div>
  )
}
