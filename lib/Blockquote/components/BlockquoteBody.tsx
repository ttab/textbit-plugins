import { type Plugin } from '@ttab/textbit'

export const BlockquoteBody = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return <div className="font-serif text-3xl opacity-80 font-light">
    {children}
  </div>
}
