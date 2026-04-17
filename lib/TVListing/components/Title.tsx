import type { PropsWithChildren } from "react"

export const Title = ({ children }: PropsWithChildren) => {
  return (
    <div className="border-b flex gap-3 text-sm py-2 items-start">
      <label contentEditable={false} className="w-14 text-sm opacity-70">Titel</label>
      {children}
    </div>
  )
}
