import { FocusIcon } from "lucide-react"

export const VisualFocus = ({ focus }: {
  focus: {
    x: number
    y: number
  }
}) => {
  return (
    <FocusIcon
      color='rgba(255, 255, 255, 0.9)'
      className="absolute w-[40px] h-[40px] -mt-[20px] -ml-[20px] rounded-[12px] flex items-center justify-center pointer-events-none"
      style={{
        left: `${focus.x * 100}%`,
        top: `${focus.y * 100}%`,
      }}
    />
  )
}
