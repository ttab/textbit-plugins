import type { Plugin } from '@ttab/textbit'

export const CodeBlock = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return <div className="py-2 p-4 font-monospace text-sm border">
    {children}
  </div>
}
