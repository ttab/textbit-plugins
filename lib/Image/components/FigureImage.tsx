import type { Plugin } from '@ttab/textbit'
import {useEffect, useRef } from 'react'
import { type Descendant, Element, Transforms } from 'slate'
import { CropDialog } from '../../components/CropDialog/CropDialog'

export const FigureImage = ({ editor, children, rootNode }: Plugin.ComponentProps): JSX.Element => {
  const { properties = {} } = Element.isElement(rootNode) ? rootNode : {}
  const src: string = properties?.src as string || ''
  const point: { x: number, y: number } | null = properties?.point
  const area: { x: number, y: number, w: number, h: number } | null = properties?.area
  const imgContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imgContainerRef?.current) {
      return
    }
    imgContainerRef.current.classList.remove('appear-dimmed')
  }, [])

  return (
    <div contentEditable={false} draggable={false}>
      <div ref={imgContainerRef} className='relative rounded rounded-xs overflow-hidden'>
        <img width='100%' src={src} />

        <CropDialog src={src} area={area} point={point} onChange={({area, point}) => {
          console.log(area, point)

          const n = editor.children.findIndex((child: Descendant) => child.id === rootNode?.id)
          if (n < 0) {
            return
          }

          Transforms.setNodes(
            editor,
            {
              properties: {
                ...rootNode.properties,
                point,
                area
              }
            },
            { at: [n] }
          )
        }} />

      </div>
      {children}
    </div>
  )
}
