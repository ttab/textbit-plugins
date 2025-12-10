import type { TBComponentProps } from '@ttab/textbit'

export const BlockquoteBody = ({ children }: TBComponentProps) => {
  return <div className="font-serif text-3xl opacity-80 font-light">
    {children}
  </div>
}
