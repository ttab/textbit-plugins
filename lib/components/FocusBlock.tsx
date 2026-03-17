import type { PropsWithChildren } from 'react'

export const Block = ({ children, className }: PropsWithChildren & {
  className?: string
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
