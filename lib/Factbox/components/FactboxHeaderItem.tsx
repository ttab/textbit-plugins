import type { LucideIcon } from 'lucide-react'
import { cn } from '../../cn'

export const FactboxHeaderItem = ({ icon, title, onMouseDown, children }: React.PropsWithChildren & {
  title?: string
  icon?: {
    icon: LucideIcon,
    className?: string
  }
  onMouseDown?: React.MouseEventHandler<HTMLSpanElement>
}): JSX.Element => {
  const hoverClasses = (onMouseDown) ? 'hover:bg-slate-300' : ''

  return (
    <div className='h-7 w-7 rounded flex flex-row gap-2 items-center justify-center' onMouseDown={onMouseDown} title={title}>
      {icon && (
        <div className={cn('p-1 rounded', hoverClasses)}>
          <icon.icon
            className={icon.className}
            size={15}
          />
        </div>
      )}
      {children}
    </div>
  )
}