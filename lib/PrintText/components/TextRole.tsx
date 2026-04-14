import type { PropsWithChildren } from "react"

export const TextRole = ({ children }: PropsWithChildren) => {
  return (
    <div className='border-t flex items-center pt-1'>
      <span className='font-semibold pr-2 pl-1 py-1' contentEditable={false}>Roll</span>
      {children}
    </div>
  )
}
