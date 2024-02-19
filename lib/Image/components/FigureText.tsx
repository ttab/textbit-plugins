import type { Plugin } from '@ttab/textbit'

export const FigureText = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return <div draggable={false} className="core/image-input">
    <label contentEditable={false}>Text:</label >
    <figcaption>{children}</figcaption>
  </div >
}
