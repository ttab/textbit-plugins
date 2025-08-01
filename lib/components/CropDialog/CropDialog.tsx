import { type CSSProperties, useEffect, useRef, useState } from 'react'
import { cva } from 'class-variance-authority'
import { CropDialogMenu } from './CropDialogMenu'
import { cn } from '../../cn'
import { Softcrop } from './Softcrop'

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
      sf.current.destroy()
    }

    if (!containerEl.current || !wrapperEl.current || !imageEl.current || !focusPointEl.current) {
      return
    }

    sf.current = new Softcrop(
      containerEl.current,
      wrapperEl.current,
      imageEl.current,
      focusPointEl.current,
      {
        onChange: (data) => {
          // FIXME: Handle data
        }
      }
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
          <CropGrid/>
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


const CropGrid = ():JSX.Element => {
  return (
    <>
      <CropGridLine direction='horizontal' offset={33} />
      <CropGridLine direction='horizontal' offset={67} />
      <CropGridLine direction='vertical' offset={33} />
      <CropGridLine direction='vertical' offset={67} />
    </>
  )
}


const CropGridLine = ({direction, offset}: {
  direction: 'horizontal' | 'vertical'
  offset: number
}): JSX.Element => {
  const line = cva(`
    absolute
    opacity-50
    pointer-events-none
    transition-[opacity]
    ease-in-out
    duration-200
    group-[.grid]:opacity-50`
  , {
    variants: {
      'direction': {
        'horizontal': 'left-0 right-0 h-[1px]',
        'vertical': 'top-0 bottom-0 w-[1px]'
      }
    }
  })

  const style: CSSProperties = {
    backdropFilter: 'invert(0.8)'
  }

  if (direction === 'vertical') {
    style.left = `${offset}%`
  } else {
    style.top = `${offset}%`
  }

  return (
    <div className={cn(line({direction}))} style={style}></div>
  )
}
