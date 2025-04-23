import { useAction, type Plugin } from '@ttab/textbit'
import { Pencil, PenOff, FilePen, MessageSquareWarning, X } from 'lucide-react'
import { FactboxModified } from './FactboxModified'
import { FactboxHeaderItem } from './FactboxHeaderItem'
import { type Descendant, Transforms } from 'slate'
import { cn } from '../../cn'
import { FocusBlock } from '../../components/FocusBlock'

export const Factbox = ({ children, element, options, editor }: Plugin.ComponentProps): JSX.Element => {
  const setEditable = useAction('core/factbox', 'edit-factbox')
  const editable = !!element?.properties?.editable
  const modified = element?.properties?.modified ?? ''
  const locally_changed = element?.properties?.locally_changed ?? ''
  const original_updated = element?.properties?.original_updated ?? ''
  const original_version = element?.properties?.original_version ?? ''
  const original_id = element?.properties?.original_id
  const removable = options?.removable as boolean ?? false

  return (
    <FocusBlock className='my-2'>
      <div className={cn(
        'group border-2 rounded border-slate-200',
        editable ? '' : 'bg-slate-50'
      )}>
        <div
          contentEditable={false}
          className='flex justify-start items-center bg-slate-200 border-b-2 border-slate-200 ps-0.5 pb-[2px] pt-[1px]'
          onMouseDown={(e) => { e.stopPropagation() }}
        >
          {!editable &&
            <FactboxHeaderItem
              title='Redigera faktarutan enbart i denna artikel. Originalets innehåll kommer inte att ändras.'
              icon={{
                icon: !removable ? PenOff : Pencil
              }}
              onMouseDown={(e) => {
                if (!removable) {
                  return
                }

                e.preventDefault()
                if (setEditable) {
                  setEditable({
                    id: element.id,
                    editable: !editable,
                    original_id,
                    original_updated,
                    original_version,
                    locally_changed: new Date().toISOString()
                  })
                }
              }}
            />
          }

          {editable &&
            <FactboxHeaderItem
              title='Faktarutans text har anpassats för denna artikel'
              icon={{
                icon: MessageSquareWarning,
                className: 'text-red-800'
              }}
            />
          }

          {options?.onEditOriginal && typeof options.onEditOriginal === 'function' && original_id
            ? <FactboxHeaderItem
              title={'Redigera faktarutans original'}
              onMouseDown={(e) => {
                if (!removable) {
                  return
                }

                e.preventDefault();
                e.stopPropagation();
                (options.onEditOriginal as (id: string) => void)(original_id as string)
              }}
              icon={{
                icon: FilePen
              }} />
            : null
          }

          <FactboxModified modified={locally_changed || modified || original_updated} />
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

        {editable && (
          <div contentEditable={false} className='flex items-center gap-2 text-xs text-red-800 m-1 p-2 bg-slate-100 rounded-sm px-2 py-1'>
            Faktarutans text har anpassats för denna artikel och kan skilja sig från originalet.
          </div>
        )}
      </div>
    </FocusBlock>
  )
}
