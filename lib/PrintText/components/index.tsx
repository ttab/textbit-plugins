import { type Plugin } from '@ttab/textbit'
import { X } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { type Descendant, Transforms } from 'slate'

export const PrintText = ({ children, editor, element }: Plugin.ComponentProps & PropsWithChildren): JSX.Element => {
  return (
    <>
      <div draggable={false} className='border rounded p-1 py-2 font-serif'>
            <div
              className='place-self-end hover:cursor-pointer hover:bg-slate-200 p-1 rounded'
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
        {children}
      </div>
    </>
  )
}
