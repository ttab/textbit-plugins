import type { PropsWithChildren } from 'react'
import type { Descendant, Editor } from 'slate'
import { Transforms } from 'slate'
import type { TBElement } from '@ttab/textbit'
import { XIcon } from 'lucide-react'
import { cn } from '../cn'

export const FocusBlock = ({ children, className, editor, element, removable }: PropsWithChildren & {
  className?: string
  editor?: Editor
  element?: TBElement
  removable?: boolean
}) => {
  return (
    <div 
      className={cn(
        'relative', 
        removable && 'group', className)}
    >
      <div 
        contentEditable={false} 
        className='absolute inset-0 rounded pointer-events-none ring-offset-4 group-data-[state="active"]:rounded group-data-[state="active"]:ring-1' 
      />
      <div className='relative rounded'>
        {removable && editor && element && (
          <div 
            contentEditable={false} 
            className='absolute hidden right-1 top-2 size-8 w-fit text-slate-900 dark:text-white justify-between items-center group-hover:block z-50'
          >
            <div
              className={cn('p-1 rounded opacity-70 bg-slate-200 hover:opacity-100 dark:bg-gray-700')}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const n = editor.children.findIndex((child: Descendant) => child.id === element.id)

                if (n > -1) {
                  Transforms.removeNodes(editor, { at: [n] })
                }
              }}
            >
              <XIcon size={15} />
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
