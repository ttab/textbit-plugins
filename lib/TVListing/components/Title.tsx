import type { PropsWithChildren } from "react"

export const Title = ({ children }: PropsWithChildren) => {
  return (
    <div className="border-b flex items-center gap-3 text-sm py-2">
      <div contentEditable={false} className="text-sm opacity-70">Titel</div>
      {children}
    </div>
  )
}
