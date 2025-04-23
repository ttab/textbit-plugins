import type { PropsWithChildren } from 'react'
import { cn } from '../cn'

export const FocusBlock = ({ children, className }: PropsWithChildren & {
  className?: string
}) => {
  return (
    <div className={cn('relative', className)}>
      <div contentEditable={false} className='absolute inset-0 rounded pointer-events-none group-data-[state="selected"]:rounded group-data-[state="selected"]:ring-1 ring-offset-4 animate-pulse' />
      <div className='relative z-1 rounded'>
        {children}
      </div>
    </div>
  )
}
