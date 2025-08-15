import { useRef, useState } from 'react'
import type { SoftcropArea, SoftcropPoint } from './softcrop-lib'
import { CropDialogMenu } from './Menu'
import { Softcrop, type SoftcropRef } from './Softcrop'
import { Grid } from './Grid'

export interface SoftcropData {
  crop: SoftcropArea | null
  focus: SoftcropPoint | null
}

export const CropDialog = ({
  src,
  area,
  point,
  onChange,
  enableFocusPoint = true,
  enableDragHandles = true,
  enablePanAndZoom = true
}: {
  src: string
  area: SoftcropArea | null
  point: SoftcropPoint | null
  onChange: (arg: SoftcropData) => void
  enableFocusPoint?: boolean
  enableDragHandles?: boolean
  enablePanAndZoom?: boolean
}): JSX.Element => {
  const [isActive, toggleIsActive] = useState(false)
  const softcropRef = useRef<SoftcropRef>(null)

  const handleToggle = (newState: boolean) => {
    if (!newState && softcropRef.current) {
      // Extract data when closing
      onChange({
        crop: softcropRef.current.getCropArea(),
        focus: softcropRef.current.getFocusPoint()
      })
    }

    toggleIsActive(newState)
  }

  return (
    <>
      {isActive && (
        <Softcrop
          ref={softcropRef}
          src={src}
          enableDragHandles={enableDragHandles}
          enableFocusPoint={enableFocusPoint}
          enablePanAndZoom={enablePanAndZoom}
          onReady={() => {
            if (!softcropRef.current) return

            if (area) {
              const { x, y, w, h } = area
              softcropRef.current.setCropArea(x, y, w, h)
            }

            if (point) {
              const {x, y} = point
              softcropRef.current.setFocusPoint(x, y)
            }
          }}
        >
          <Grid />
        </Softcrop>
      )}

      <CropDialogMenu
        active={isActive}
        onToggle={handleToggle}
        onZoom={(direction) => {
          if (!softcropRef.current) return
          if (direction === 'in') {
            softcropRef.current.zoomIn()
          } else {
            softcropRef.current.zoomOut()
          }
        }}
        onReset={() => {
          softcropRef.current?.reset()
        }}
      />
    </>
  )
}
