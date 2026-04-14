import type { TBComponentProps } from '@ttab/textbit'
import { XIcon, FileTypeCornerIcon } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { type Descendant, Transforms } from 'slate'

export const PrintText = ({ children, editor, element }: TBComponentProps & PropsWithChildren) => {
  return (
    <div className='border rounded'>
      <div
        contentEditable={false}
        draggable={true}
        className='flex items-center justify-between bg-slate-300 dark:bg-slate-900 p-1 cursor-grab'
      >
        <div className='flex items-center gap-2'>
          <FileTypeCornerIcon size={15} />
          <span className='text-xs font-semibold'>Print-text</span>
        </div>
        <div
          className='hover:cursor-pointer hover:bg-slate-200 dark:hover:bg-gray-700 p-1 rounded'
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
      {children}
    </div>
  )
}
