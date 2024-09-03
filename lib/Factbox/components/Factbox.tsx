import { Element, useAction, type Plugin } from '@ttab/textbit'
import { Edit2, FileInput, MessageSquareWarning } from 'lucide-react'

export const Factbox = ({ children, element }: Plugin.ComponentProps): JSX.Element => {
  const setEditable = useAction('core/factbox', 'edit-factbox')
  const editable = !!element?.properties?.editable

  return (
    <Element className="py-4 group">
      <div className={`border-2 rounded border-slate-200 bg-slate-50 group-data-[state='active']:rounded group-data-[state='active']:ring-1 ring-offset-4 ${editable ? '' : 'shadow-lg'}`}>

        <div contentEditable={false} className='flex justify-between items-center bg-slate-200 pb-0.5'>
          <div className='py-2 ps-2 opacity-70 font-semibold text-xs'>
            Ändrades för 2 år och 2 månader sedan
          </div>

          <div className='flex justify-between items-center gap-2'>
            {!editable &&
              <a
                href='#'
                className='p-1.5 me-0.5 rounded hover:bg-slate-300'
                title='Anpassa faktarutan i denna artikel'
                onMouseDown={(e) => {
                  e.preventDefault()

                  if (setEditable) {
                    setEditable({
                      id: element.id,
                      editable: !editable
                    })
                  }
                }}>
                <Edit2 size={16} />
              </a>
            }

            {editable &&
              <span
                title='Faktarutans text har anpassats för denna artikel'
                className='mt-0.5 p-1.5 me-0.5 rounded'>
                <MessageSquareWarning size={17} className='text-red-800' />
              </span>
            }

            <a
              href='#'
              className='p-1.5 me-0.5 rounded hover:bg-slate-300'
              title='Öppna faktarutans original för redigering'
              onMouseDown={(e) => {
                e.preventDefault()
                console.log('Open external factbox not implemented')
              }}
            ><FileInput size={16} /></a>
          </div>
        </div>

        <div className='px-6 pt-1 pb-2'>
          {children}
        </div>
      </div>
    </Element >
  )
}
