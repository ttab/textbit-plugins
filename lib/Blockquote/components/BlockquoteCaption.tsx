import type { TBComponentProps } from '@ttab/textbit'

export const BlockquoteCaption = ({ children }: TBComponentProps) => {
  return <div className="pt-2 font-serif text-md italic text-slate-700 dark:text-slate-300">
    {children}
  </div>
}
