import type { TBComponentProps } from '@ttab/textbit'
import type { TBElement } from '@ttab/textbit'
import { TableIcon, XIcon } from 'lucide-react'
import { Transforms } from 'slate'
import { cn } from '../../cn'

export const TVLWrapper = ({ editor, children, element }: TBComponentProps) => {
  const isFirst = !!editor && !!element && (editor.children as TBElement[])[0]?.id === element.id

  return (
    <div className={cn('border rounded', !isFirst && 'mt-3')}>
      <div
        contentEditable={false}
        draggable={true}
        className='flex flex-nowrap justify-between items-center basis-full p-1 bg-slate-300 dark:bg-slate-900 cursor-grab'
      >
        <div className='flex items-center gap-2'>
          <TableIcon size={15} />
          <span className='text-xs font-semibold'>Tablåinformation</span>
        </div>
        <div
          className='hover:cursor-pointer hover:bg-slate-200 dark:hover:bg-gray-700 p-1 rounded'
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
            const n = editor.children.findIndex((child) => (child as TBElement).id === element.id)

            if (n > -1) {
              Transforms.removeNodes(editor, { at: [n] })
            }
          }}
        >
          <XIcon size={15} className='text-black dark:text-white' />
        </div>

      </div>
      <div className='p-2'>
        {children}
      </div>
    </div>
  )
}
