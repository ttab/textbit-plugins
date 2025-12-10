import type { TBComponentProps } from '@ttab/textbit'

// TODO: Use https://prismjs.com/ to display code
export const CodeBlockBody = ({ children }: TBComponentProps) => {
  return (
    <code className="prewrap">
      {children}
    </code>
  )
}
