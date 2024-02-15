import { type Plugin } from '@ttab/textbit'

export const CodeBlock = ({ children }: Plugin.ComponentProps): JSX.Element => {
  const style = {
    padding: '1rem',
    border: '1px solid gray',
    fontFamily: 'monospace'
  }

  return <div style={style}>
    {children}
  </div>
}
