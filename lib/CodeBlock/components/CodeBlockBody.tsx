import { Plugin } from '@ttab/textbit'

export const CodeBlockBody: Plugin.Component = ({ children }) => {
  return (
    <code style={{ padding: '0.5rem 0', whiteSpace: 'pre-wrap' }}>
      {children}
    </code>
  )
}
