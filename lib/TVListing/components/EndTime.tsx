import type { PropsWithChildren } from "react"

export const EndTime = ({ children }: PropsWithChildren) => {
  return (
    <div className="border-b flex items-center gap-3 text-sm py-2">
      <label contentEditable={false} className="w-14 text-sm opacity-70">Sluttid</label>
      {children}
    </div>
  )
}
