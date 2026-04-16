import type { PropsWithChildren } from 'react'

export const Text = ({ children }: PropsWithChildren) => {
  return (
    <div className='border-t flex items-baseline py-2 text-sm'>
      <span className='text-sm px-1 opacity-70' contentEditable={false}>Text</span>
      <div>{children}</div>
    </div>
  )
}
