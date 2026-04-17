import type { PropsWithChildren } from "react"

export const Day = ({ children }: PropsWithChildren) => {
  return (
    <div className="border-b flex items-center gap-3 text-sm py-2">
      <label contentEditable={false} className="w-14 opacity-70">Dag</label>
      {children}
    </div>
  )
}
