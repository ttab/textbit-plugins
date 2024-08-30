import { type Plugin } from '@ttab/textbit'

export const FactboxTitle = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return <div className="pt-2 font-sans text-2xl font-bold text-slate-700 dark:text-slate-300">
    {children}
  </div>
}
