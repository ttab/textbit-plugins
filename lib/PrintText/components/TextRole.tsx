import type { PropsWithChildren } from "react"

export const TextRole = ({ children }: PropsWithChildren) => {
  return (
    <div className='border-t flex items-center py-2 text-sm'>
      <span className='text-sm px-1 opacity-70' contentEditable={false}>Roll</span>
      <div>{children}</div>
    </div>
  )
}
