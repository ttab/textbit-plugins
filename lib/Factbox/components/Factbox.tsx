import { Element, useAction, type Plugin } from '@ttab/textbit'
import { Edit2 } from 'lucide-react'

export const Factbox = ({ children, element }: Plugin.ComponentProps): JSX.Element => {
  const setEditable = useAction('core/factbox', 'edit-factbox')
  // const contentClassName = editable ? 'px-6' : 'px-6 opacity-70'

  return (
    <Element className="py-4 group">
      <div contentEditable={false} className="pb-1 border-2 border-l-8 rounded border-slate-200 bg-slate-50 group-data-[state='active']:rounded group-data-[state='active']:ring-1 ring-offset-4 rounded-xs shadow-lg">

        <div contentEditable={false} className="border-1 bg-slate-200 flex justify-between items-center">
          <div className='flex justify-start items-center'>
            <div className='p-2 opacity-70 font-semibold text-xs'>
              Ändrades för 2 år och 2 månader sedan
            </div>
          </div>

          <a
            onClick={() => {
              if (setEditable) {
                setEditable({
                  editable: !!element?.properties?.editable
                })
              }
            }}
            href='#'
            className='p-2 me-1 rounded hover:bg-slate-300'
          >
            <Edit2 size={11} />
          </a>
        </div>

        <div className='px-6'>
          {children}
        </div>
      </div>
    </Element>
  )
}
