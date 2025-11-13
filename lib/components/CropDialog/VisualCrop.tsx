export const VisualCrop = ({ crop }: {
  crop: {
    x: number
    y: number
    w: number
    h: number
  }
}) => {
  return (
    <div
      className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none"
      style={{
        clipPath: `polygon(
          0% 0%,
          0% 100%,
          ${crop.x * 100}% 100%,
          ${crop.x * 100}% ${crop.y * 100}%,
          ${(crop.x + crop.w) * 100}% ${crop.y * 100}%,
          ${(crop.x + crop.w) * 100}% ${(crop.y + crop.h) * 100}%,
          ${crop.x * 100}% ${(crop.y + crop.h) * 100}%,
          ${crop.x * 100}% 100%,
          100% 100%,
          100% 0%
        )`
      }}
    />
  )
}
