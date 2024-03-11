import { type Plugin } from '@ttab/textbit'

export const BlockquoteCaption = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return <div className="pt-2 font-serif text-md italic text-slate-700 dark:text-slate-300">
    {children}
  </div>
}
