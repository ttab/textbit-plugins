import type { TBComponentProps } from '@ttab/textbit'

export const CodeBlock = ({ children }: TBComponentProps) => {
  return <div className="py-2 p-4 font-monospace text-sm border">
    {children}
  </div>
}
