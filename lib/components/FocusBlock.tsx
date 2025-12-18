import type { PropsWithChildren } from 'react'
import { cn } from '../cn'

export const FocusBlock = ({ children, className }: PropsWithChildren & {
  className?: string
}) => {
  return (
    <div className={cn('relative', className)}>
      <div contentEditable={false} className='absolute inset-0 rounded pointer-events-none ring-offset-4 group-data-[state="active"]:rounded group-data-[state="active"]:ring-1' />
      <div className='relative rounded'>
        {children}
      </div>
    </div>
  )
}
