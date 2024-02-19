import { type Plugin } from '@ttab/textbit'

export const OembedWrapper = ({ children }: Plugin.ComponentProps): JSX.Element => {
  const style = {
    minHeight: '10rem'
  }

  return <div style={style} draggable={false}>
    {children}
  </div>
}
