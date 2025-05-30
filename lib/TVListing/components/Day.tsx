import type { PropsWithChildren } from "react"

export const Day = ({ children }: PropsWithChildren) => {
  return (
    <div className="border-b">
      <div contentEditable={false} className="font-semibold">Dag</div>
      {children}
    </div>
  )
}
