import type { Plugin } from '@ttab/textbit'
import { useRef } from 'react'
import { type Descendant, Element, Transforms } from 'slate'
import { CropDialog } from '../../components/CropDialog/CropDialog'
import { FocusIcon } from 'lucide-react'

export const FigureImage = ({ editor, children, rootNode }: Plugin.ComponentProps): JSX.Element => {
  const { properties = {} } = Element.isElement(rootNode) ? rootNode : {}
  const src: string = properties?.src as string || ''
  const focus = properties?.focus as string || null
  const crop = properties?.crop as string || null
  const imgContainerRef = useRef<HTMLDivElement>(null)

  // Parse crop string to {x, y, w, h} object (or null)
  const area: { x: number, y: number, w: number, h: number } | null = crop
    ? (() => {
        const parts = crop.split(' ').map(parseFloat)
        return parts.length === 4 ? { x: parts[0], y: parts[1], w: parts[2], h: parts[3] } : null
      })()
    : null

  // Parse focus string to {x, y} object (or null)
  const point: { x: number, y: number } | null = focus
    ? (() => {
        const parts = focus.split(' ').map(parseFloat)
        return parts.length === 2 ? { x: parts[0], y: parts[1] } : null
      })()
    : null

  return (
    <div contentEditable={false} draggable={false}>
      <div ref={imgContainerRef} className='relative rounded rounded-xs overflow-hidden'>
        {/* Full image */}
        <img width='100%' src={src} />

        {/* Overlay with cutout for crop area */}
        {area && (
          <div
            className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none"
            style={{
              clipPath: `polygon(
                0% 0%,
                0% 100%,
                ${area.x * 100}% 100%,
                ${area.x * 100}% ${area.y * 100}%,
                ${(area.x + area.w) * 100}% ${area.y * 100}%,
                ${(area.x + area.w) * 100}% ${(area.y + area.h) * 100}%,
                ${area.x * 100}% ${(area.y + area.h) * 100}%,
                ${area.x * 100}% 100%,
                100% 100%,
                100% 0%
              )`
            }}
          />
        )}

        {/* Focus point indicator */}
        {point && (
          <FocusIcon
            color='rgba(255, 255, 255, 0.9)'
            className="absolute w-[40px] h-[40px] -mt-[20px] -ml-[20px] rounded-[12px] flex items-center justify-center pointer-events-none"
            style={{
              left: `${point.x * 100}%`,
              top: `${point.y * 100}%`,
            }}
          />
        )}

        <CropDialog
          src={src}
          area={area}
          point={point}
          onChange={({crop, focus}) => {
            const n = editor.children.findIndex((child: Descendant) => child.id === rootNode?.id)
            if (n < 0) {
              return
            }

            // Convert back to string format for storage
            const cropString = crop ? `${crop.x} ${crop.y} ${crop.w} ${crop.h}` : undefined
            const focusString = focus ? `${focus.x} ${focus.y}` : undefined

            Transforms.setNodes(
              editor,
              {
                properties: {
                  ...rootNode.properties,
                  crop: cropString,
                  focus: focusString
                }
              },
              { at: [n] }
            )
          }}
        />
      </div>
      {children}
    </div>
  )
}
