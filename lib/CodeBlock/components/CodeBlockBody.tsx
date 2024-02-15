import { type Plugin } from '@ttab/textbit'

// TODO: Use https://prismjs.com/ to display code
export const CodeBlockBody = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return (
    <code style={{ padding: '0.5rem 0', whiteSpace: 'pre-wrap' }}>
      {children}
    </code>
  )
}
