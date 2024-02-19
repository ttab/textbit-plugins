import { type Plugin } from '@ttab/textbit'

export const OembedTitle = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return <div className="core/oembed-input">
    <label contentEditable={false}>Title:</label>
    <span>{children}</span>
  </div>
}
