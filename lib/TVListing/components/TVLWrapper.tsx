import type { PropsWithChildren } from 'react'

export const TVLWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className='border rounded p-2'>{children}</div>
  )
}
