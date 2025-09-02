import { type CSSProperties } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../cn'

export const GridLine = ({direction, offset}: {
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
