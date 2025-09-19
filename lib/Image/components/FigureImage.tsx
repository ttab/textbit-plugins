import type { Plugin } from '@ttab/textbit'
import { useRef } from 'react'
import { type Descendant, Element, Transforms } from 'slate'
import { CropDialog } from '../../components/CropDialog/CropDialog'
import { parseCropString, parseFocusString } from '../../components/CropDialog/softcrop-lib'
import { VisualCrop } from '../../components/CropDialog/VisualCrop'
import { VisualFocus } from '../../components/CropDialog/VisualFocus'

export const FigureImage = ({ editor, children, rootNode }: Plugin.ComponentProps): JSX.Element => {
  const { properties = {} } = Element.isElement(rootNode) ? rootNode : {}
  const src: string = properties?.src as string || ''

  const focusStr = properties?.focus as string || undefined
  const cropStr = properties?.crop as string || undefined
  const imgContainerRef = useRef<HTMLDivElement>(null)

  const crop = parseCropString(cropStr)
  const focus = parseFocusString(focusStr)

  return (
    <div contentEditable={false} draggable={false}>
      <div ref={imgContainerRef} className='relative rounded rounded-xs overflow-hidden'>
        {/* Full image */}
        <img width='100%' src={src} />

        {/* Overlay with cutout for crop area */}
        {crop && <VisualCrop crop={crop}/>}

        {/* Focus point indicator */}
        {focus && <VisualFocus focus={focus}/>}

        <CropDialog
          src={src}
          area={crop}
          point={focus}
          onChange={({crop, focus}) => {
            // @ts-expect-error TODO: overhaul of typings
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
                  // @ts-expect-error TODO: overhaul of typings
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
