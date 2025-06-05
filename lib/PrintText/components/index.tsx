import { type Plugin } from '@ttab/textbit'
import type { PropsWithChildren } from 'react'

export const PrintText = ({ children }: Plugin.ComponentProps & PropsWithChildren): JSX.Element => {
  return (
    <>
      <div draggable={false} className='border rounded p-1 py-2 font-serif'>
        {children}
      </div>
    </>
  )
}
