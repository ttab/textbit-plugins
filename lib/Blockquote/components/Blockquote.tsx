import { Element, type Plugin } from '@ttab/textbit'

export const Blockquote = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return <Element className="py-4">
    <div className="px-6 border-l-8 border-l-slate-200">
      {children}
    </div>
  </Element>
}
