import type { Plugin } from '@ttab/textbit'

export const Blockquote = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return (
    <div className="px-6 py-4 border-l-8 border-l-slate-200 group-data-[state='active']:rounded group-data-[state='active']:ring-1 ring-offset-4 rounded-xs">
      {children}
    </div>
  )
}
