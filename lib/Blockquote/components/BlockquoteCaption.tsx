import { type Plugin } from '@ttab/textbit'

export const BlockquoteCaption = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return <div className="core/blockquote/caption">
    {children}
  </div>
}
