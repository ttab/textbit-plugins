import { type Plugin } from '@ttab/textbit'

export const BlockquoteBody = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return <div className="core/blockquote/body">
    {children}
  </div>
}
