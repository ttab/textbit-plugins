import type { PropsWithChildren } from "react"

export const Time = ({ children }: PropsWithChildren) => {
  return (
    <div className="border-b">
      <div contentEditable={false} className="font-semibold">Starttid</div>
      {children}
    </div>
  )
}
