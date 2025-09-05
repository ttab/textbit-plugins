import { Plugin } from '@ttab/textbit'
import { X } from 'lucide-react'
import { type Descendant, Transforms } from 'slate'

export const TVLWrapper = ({ editor, children, element }: Plugin.ComponentProps) => {
  return (
    <div className='border rounded'>
      <div className='flex flex-nowrap justify-between items-center basis-full p-1 bg-slate-300'>
        <span className='text-sm' contentEditable={false}>Tablåinformation</span>
        <div
          className='hover:cursor-pointer hover:bg-slate-200 p-1 rounded'
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
            const n = editor.children.findIndex((child: Descendant) => child.id === element.id)

            if (n > -1) {
              Transforms.removeNodes(editor, { at: [n] })
            }
          }}
        >
          <X size={15} />
        </div>

      </div>
      <div className='p-2'>
        {children}
      </div>
    </div>
  )
}
