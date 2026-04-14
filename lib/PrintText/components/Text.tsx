import type { PropsWithChildren } from 'react'

export const Text = ({ children }: PropsWithChildren) => {
  return (
    <div className='border-t flex items-baseline pt-1'>
      <span className='font-semibold pr-2 pl-1 py-1' contentEditable={false}>Text</span>
      {children}
    </div>
  )
}
