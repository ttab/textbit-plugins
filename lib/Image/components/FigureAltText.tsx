import type { Plugin } from '@ttab/textbit'

export const FigureAltText = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return <div draggable={false} className="core/image-input">
    <label contentEditable={false}>Alt:</label>
    <figcaption>{children}</figcaption>
  </div>
}
