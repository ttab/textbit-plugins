import type { PropsWithChildren } from 'react'

export const Text = ({ children }: PropsWithChildren) => {
  return (
    <div className='border-t flex items-baseline py-2 text-sm'>
      <label className='text-sm px-1 opacity-70 w-14 pr-2' contentEditable={false}>Text</label>
      <div>{children}</div>
    </div>
  )
}
