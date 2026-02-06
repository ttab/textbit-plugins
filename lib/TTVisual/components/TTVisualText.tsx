import type { TBComponentProps } from '@ttab/textbit'

export const TTVisualText = ({ children, options }: TBComponentProps) => {
  const { captionLabel } = options as { captionLabel?: string }

  return (
    <div className='flex items-center ps-6 bg-slate-100 dark:bg-slate-800 text-sm py-0.5'>
      <label contentEditable={false} className='w-12 opacity-60'>
        {`${captionLabel ?? 'Text'}:`}
      </label>

      <figcaption className='p-1'>
        {children}
      </figcaption>
    </div>
  )
}
