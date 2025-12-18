import type { TBComponentProps } from '@ttab/textbit'
import { FilePen, MessageCircleWarning, X } from 'lucide-react'
import { FactboxModified } from './FactboxModified'
import { FactboxHeaderItem } from './FactboxHeaderItem'
import { type Descendant, Transforms } from 'slate'
import { FocusBlock } from '../../components/FocusBlock'

const MESSAGE = 'Ändringar i faktarutans text sker endast för denna artikel'

export const Factbox = ({ children, element, options, editor }: TBComponentProps) => {
  const original_updated = element?.properties?.original_updated ?? ''
  const original_id = element?.properties?.original_id
  const removable = options?.removable as boolean ?? false

  return (
    <FocusBlock className='my-2'>
      <div className='group border-2 rounded border-slate-200'>
        <div
          contentEditable={false}
          draggable={true}
          className='flex justify-start items-center bg-slate-200 border-b-2 border-slate-200 ps-0.5 pb-[2px] pt-[1px] cursor-default'
          onMouseDown={(e) => { e.stopPropagation() }}
        >
          <FactboxHeaderItem
            title={MESSAGE}
            icon={{
              icon: MessageCircleWarning,
              className: 'text-red-800'
            }}
          />

          {options?.onEditOriginal && typeof options.onEditOriginal === 'function' && original_id
            ? <FactboxHeaderItem
                title={'Redigera faktarutans original'}
                onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                (options.onEditOriginal as (id: string) => void)(original_id as string)
              }}
                icon={{
                icon: FilePen
              }} />
            : null
          }

          <FactboxModified modified={original_updated} />

          {removable && (
            <>
              <div className='grow'></div>
              <div className='hidden grow-0 items-center justify-end group-hover:block'>
                <FactboxHeaderItem
                  className='opacity-60 hover:opacity-100'
                  icon={{
                    icon: X
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const n = editor.children.findIndex((child: Descendant) => child.id === element.id)

                    if (n > -1) {
                      Transforms.removeNodes(editor, { at: [n] })
                    }
                  }}
                />
              </div>
            </>
          )}

        </div>

        <div className='px-6 pt-1 pb-2'>
          {children}
        </div>


        <div contentEditable={false} className='flex items-center gap-2 text-xs text-red-800 m-1 p-2 bg-slate-100 rounded-sm px-2 py-1'>
          {MESSAGE}
        </div>
      </div>
    </FocusBlock>
  )
}
