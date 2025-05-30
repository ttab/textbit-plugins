import { type Plugin } from '@ttab/textbit'

export const TTVisualByline = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return (
    <div className='flex items-center ps-6 bg-slate-100 text-sm py-0.5'>
      <label contentEditable={false} className='w-12 opacity-60'>
        Foto:
      </label>

      <figcaption className='p-1'>
        {children}
      </figcaption>
    </div>
  )
}
