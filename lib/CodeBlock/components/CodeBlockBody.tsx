import type { Plugin } from '@ttab/textbit'

// TODO: Use https://prismjs.com/ to display code
export const CodeBlockBody = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return (
    <code className="prewrap">
      {children}
    </code>
  )
}
