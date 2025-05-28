import type { PropsWithChildren } from "react"

export const Title = ({ children }: PropsWithChildren) => {
  return (
    <div className="border-b">
      <div contentEditable={false} className="font-semibold">Titel</div>
      {children}
    </div>
  )
}
