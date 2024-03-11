import type { Plugin } from '@ttab/textbit'
import { useEffect, useRef } from 'react'
import { Element } from 'slate'

export const FigureImage = ({ children, attributes, rootNode }: Plugin.ComponentProps): JSX.Element => {
  const { properties = {} } = Element.isElement(rootNode) ? rootNode : {}
  const src: string = properties?.src as string || ''
  const imgContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imgContainerRef?.current) {
      return
    }
    imgContainerRef.current.classList.remove('appear-dimmed')
  }, [])

  return (
    <div contentEditable={false} {...attributes} draggable={false}>
      <div ref={imgContainerRef} className='rounded rounded-xs overflow-hidden'>
        <img width='100%' src={src} />
      </div>
      {children}
    </div>
  )
}
