import { Element, useAction, type Plugin } from '@ttab/textbit'
import { Edit2, FileInput, MessageSquareWarning } from 'lucide-react'
import { FactboxModified } from './FactboxModified'

export const Factbox = ({ children, element, options }: Plugin.ComponentProps): JSX.Element => {
  const setEditable = useAction('core/factbox', 'edit-factbox')
  const editable = !!element?.properties?.editable
  const modified = element?.properties?.modified ?? ''
  const locally_changed = element?.properties?.locally_changed ?? ''
  const original_updated = element?.properties?.original_updated ?? ''
  const original_version = element?.properties?.original_version ?? ''
  const original_id = element?.properties?.original_id

  return (
    <Element className="py-4 group">
      <div className={`border-2 rounded border-slate-200 bg-slate-50 group-data-[state='active']:rounded group-data-[state='active']:ring-1 ring-offset-4 ${editable ? '' : 'shadow-lg'}`}>
        <div contentEditable={false} className='flex justify-between items-center bg-slate-200 pb-0.5'>
          {modified ? <FactboxModified modified={element?.properties?.modified} /> : null}
          <div className='flex justify-between items-center gap-2'>
            {!editable &&
              <div
                className='p-1.5 me-0.5 rounded hover:bg-slate-300'
                title='Anpassa faktarutan i denna artikel'
                onMouseDown={(e) => {
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
                }}>
                <Edit2 size={16} />
              </div>
            }

            {editable &&
              <span
                title='Faktarutans text har anpassats för denna artikel'
                className='mt-0.5 p-1.5 me-0.5 rounded'>
                <MessageSquareWarning size={17} className='text-red-800' />
              </span>
            }

            {options?.onEditOriginal && typeof options.onEditOriginal === 'function'
              ?
                <div
                  className='p-1.5 me-0.5 rounded hover:bg-slate-300'
                  title='Redigera faktarutans original'
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    (options.onEditOriginal as (id: string) => void)(original_id as string)
                  }}
                  >
                  <FileInput size={16} />
                </div>
              : null}

          </div>
        </div>

        <div className='px-6 pt-1 pb-2'>
          {children}
        </div>
      </div>
    </Element >
  )
}
