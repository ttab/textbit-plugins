import type { PropsWithChildren } from "react"

export const EndTime = ({ children }: PropsWithChildren) => {
  return (
    <div className="border-b">
      <div contentEditable={false} className="font-semibold">Sluttid</div>
      {children}
    </div>
  )
}
