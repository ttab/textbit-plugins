import { useRef, useState } from 'react'
import type { SoftcropArea, SoftcropPoint } from './softcrop-lib'
import { CropDialogMenu } from './Menu'
import { Softcrop, SoftcropRef } from './Softcrop'
import { Grid } from './Grid'

export interface SoftcropData {
  area: SoftcropArea | null
  point: SoftcropPoint | null
}

export const CropDialog = ({ src, area, point, onChange }: {
  src: string
  area: SoftcropArea | null
  point: SoftcropPoint | null
  onChange: (arg: SoftcropData) => void
}): JSX.Element => {
  const [isActive, toggleIsActive] = useState(false)
  const softcropRef = useRef<SoftcropRef>(null)

  const handleToggle = (newState: boolean) => {
    if (!newState && softcropRef.current) {
      // Extract data when closing
      onChange({
        area: softcropRef.current.getCropArea(),
        point: softcropRef.current.getFocusPoint()
      })
    }

    toggleIsActive(newState)
  }

  return (
    <>
      {isActive && (
        <Softcrop ref={softcropRef} src={src} onChange={(cropArea, focusPoint) => {
          console.log(
            cropArea,
            focusPoint
          )
        }}>
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
