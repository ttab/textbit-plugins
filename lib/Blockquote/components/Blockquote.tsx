import { Element, type Plugin } from '@ttab/textbit'

export const Blockquote = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return <Element className="py-4 group">
    <div className="px-6 border-l-8 border-l-slate-200 rounded group-data-[state='active']:ring-1 ring-offset-4 rounded-xs">
      {children}
    </div>
  </Element>
}
