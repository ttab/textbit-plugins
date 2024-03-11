import { Element, type Plugin } from '@ttab/textbit'

export const CodeBlock = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return <Element className="py-2">
    <div className="p-4 font-monospace text-sm border">
      {children}
    </div>
  </Element>
}
