import { useAction, type Plugin } from '@ttab/textbit'
import { Pencil, FilePen, MessageSquareWarning, X } from 'lucide-react'
import { FactboxModified } from './FactboxModified'
import { FactboxHeaderItem } from './FactboxHeaderItem'
import { type Descendant, Transforms } from 'slate'

export const Factbox = ({ children, element, options, editor }: Plugin.ComponentProps): JSX.Element => {
  const setEditable = useAction('core/factbox', 'edit-factbox')
  const editable = !!element?.properties?.editable
  const modified = element?.properties?.modified ?? ''
  const locally_changed = element?.properties?.locally_changed ?? ''
  const original_updated = element?.properties?.original_updated ?? ''
  const original_version = element?.properties?.original_version ?? ''
  const original_id = element?.properties?.original_id

  return (
    <div className={`my-2 border-2 rounded border-slate-200 bg-slate-50 group-data-[state='active']:rounded group-data-[state='active']:ring-1 ring-offset-4 ${editable ? '' : 'shadow-lg'}`}>
      <div
        contentEditable={false}
        className='flex justify-start items-center bg-slate-200 border-b-2 border-slate-200 ps-0.5 pb-[2px] pt-[1px]'
      >
        {!editable &&
          <FactboxHeaderItem
            title='Redigera faktarutan enbart i denna artikel. Originalets innehåll kommer inte att ändras.'
            icon={{
              icon: Pencil
            }}
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

        <div className='grow'></div>

        <div className="grow-0 items-center justify-end">
          <FactboxHeaderItem
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
      </div>

      <div className='px-6 pt-1 pb-2'>
        {children}
      </div>
    </div>
  )
}