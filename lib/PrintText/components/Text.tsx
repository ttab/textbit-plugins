import type { PropsWithChildren } from 'react'

export const Text = ({ children }: PropsWithChildren) => {
  return (
    <div className='border-t flex items-baseline pt-1 text-sm'>
      <span className='font-semibold pr-2 pl-1 py-1 opacity-60' contentEditable={false}>Text</span>
      <div>{children}</div>
    </div>
  )
}
