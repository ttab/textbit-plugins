import type { PropsWithChildren } from "react"

export const Day = ({ children }: PropsWithChildren) => {
  return (
    <div className="border-b flex items-center gap-3 text-sm py-2">
      <div contentEditable={false} className="opacity-70">Dag</div>
      {children}
    </div>
  )
}
