import { useEffect, useRef, useState } from 'react'
import { CropDialogMenu } from './Menu'
import { Softcrop } from './Softcrop'
import { Grid } from './Grid'

export const CropDialog = ({src}: {
  src: string
}):JSX.Element => {
  const [isActive, toggleIsActive] = useState(false)
  const sf = useRef<Softcrop | null>(null)
  const containerEl = useRef<HTMLDivElement>(null)
  const wrapperEl = useRef<HTMLDivElement>(null)
  const imageEl  = useRef<HTMLImageElement>(null)
  const focusPointEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive && sf.current) {
      console.log(sf.current.getCropData())
      console.log(sf.current.getFocusPoint())
      sf.current.destroy()
      sf.current = null
    }

    if (!containerEl.current || !wrapperEl.current || !imageEl.current || !focusPointEl.current) {
      return
    }

    sf.current = new Softcrop(
      containerEl.current,
      wrapperEl.current,
      imageEl.current,
      focusPointEl.current
    )
  }, [isActive])

  return (
    <>
      {isActive && (
        <div ref={containerEl} className='absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden'>
          <div ref={wrapperEl} className='relative overflow-hidden w-full cursor-grab active:cursor-grabbing'>
            <img ref={imageEl} src={src} className='block absolute select-none'/>

            {/* Focus frame */}

            <div
              ref={focusPointEl}
              className={`
                absolute
                top-0
                left-0
                w-[40px]
                h-[40px]
                rounded-[12px]
                pointer-events-none
                hidden
              `}
              style={{
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 0px 20px 0px',
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.15)'
              }}
              >
              <div
                className={`
                  w-[40px]
                  h-[40px]
                  rounded-[12px]
                  flex
                  items-center
                  justify-center
                `}
                style={{
                  border: '4px solid rgba(255, 255, 255, 1)',
                  clipPath: `polygon(0% 0%, 0% 30%, 4px 30%, 4px 70%, 0% 70%, 0% 100%, 30% 100%, 30% 36px, 70% 36px, 70% 100%, 100% 100%, 100% 70%, 36px 70%, 36px 30%, 100% 30%, 100% 0%, 70% 0%, 70% 5px, 30% 5px, 30% 0%)`
                }}
              >
                {/* Focus dot */}
                <div
                  className='w-1.5 h-1.5 rounded-sm'
                  style={{
                    background: 'rgba(255, 255, 255, 1)'
                  }}
                ></div>
              </div>
            </div>
          </div>
          <Grid/>
        </div>
      )}

      <CropDialogMenu
        active={isActive}
        onToggle={toggleIsActive}
        onZoom={(direction) => {
          if (!sf.current) return

          if (direction === 'in') {
            sf.current.zoomIn()
          } else {
            sf.current.zoomOut()
          }
        }}
        onReset={() => {
          sf.current?.resetZoom()
        }}
      />
    </>
  )
}
