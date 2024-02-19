import type { Plugin } from '@ttab/textbit'

export const Figure = ({ children }: Plugin.ComponentProps): JSX.Element => {
  const style = {
    minHeight: '10rem',
    margin: '0'
  }

  return <figure style={style} draggable={false}>
    {children}
  </figure>
}
