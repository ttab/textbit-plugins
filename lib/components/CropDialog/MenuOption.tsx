export const MenuOption = ({onPress, children}: React.PropsWithChildren & {
  onPress: () => void
}): JSX.Element => {
  return (
    <a
      className={`
        relative
        h-10
        w-10
        rounded-full
        overflow-hidden
        group/icon
        `
      }
      onClick={(e) => {
        console.log('ONCLICK')
        e.preventDefault()
        e.stopPropagation()
        onPress()
      }}
      onMouseUpCapture={(e) => {
        console.log('PREVENTED mouse up')
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <div className='absolute w-full h-full bg-black opacity-60 group-hover/icon:opacity-80 flex items-center justify-center'></div>
      <div className='absolute w-full h-full flex items-center justify-center'>
        {children}
      </div>
    </a>
  )
}
