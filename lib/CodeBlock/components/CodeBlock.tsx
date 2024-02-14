import { Plugin } from '@ttab/textbit'

export const CodeBlock: Plugin.Component = ({ children }) => {
  const style = {
    padding: '1rem',
    border: '1px solid gray',
    fontFamily: 'monospace'
  }

  return <div style={style}>
    {children}
  </div>
}
