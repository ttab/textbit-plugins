export const MenuOption = ({onPress, children}: React.PropsWithChildren & {
  onPress: () => void
}) => {
  return (
    <a
      contentEditable={false}
      tabIndex={0}
      className={`
        block
        relative
        h-10
        w-10
        rounded-full
        overflow-hidden
        group/icon
        focus:ring-2
        `
      }
      onKeyDownCapture={(e) => {
        if (e.key === ' ') {
          e.preventDefault()
          onPress()
        }
      }}
      onMouseDown={(e) => {
        e.preventDefault()
        onPress()
      }}
      onMouseUpCapture={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <span className='absolute w-full h-full bg-black opacity-60 group-hover/icon:opacity-80 flex items-center justify-center'></span>
      <span className='absolute w-full h-full flex items-center justify-center'>
        {children}
      </span>
    </a>
  )
}
