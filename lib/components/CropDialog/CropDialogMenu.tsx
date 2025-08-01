import { Crop, X, Expand, ZoomIn, ZoomOut } from 'lucide-react'

export const CropDialogMenu = ({onToggle, onZoom, onReset, active }: {
  onToggle: (newState: boolean) => void
  onZoom: (direction: 'in' | 'out') => void
  onReset: () => void
  active: boolean
}):JSX.Element => {
  return (
    <div
      contentEditable={false}
      className='absolute bottom-5 right-5 flex flex-col gap-2 items-center'
    >
      {active
        && (
          <>
            <CropDialogMenuIcon onPress={() => onZoom('in')}>
              <ZoomIn size={20} strokeWidth={1.75} className="text-white "/>
            </CropDialogMenuIcon>

            <CropDialogMenuIcon onPress={() => onZoom('out')}>
              <ZoomOut size={20} strokeWidth={1.75} className="text-white "/>
            </CropDialogMenuIcon>

            <CropDialogMenuIcon onPress={() => onReset()}>
              <Expand size={20} strokeWidth={1.75} className="text-white "/>
            </CropDialogMenuIcon>
          </>
        )
      }

      <CropDialogMenuIcon onPress={() => {onToggle(!active)}}>
        {!active
          ? <Crop size={20} strokeWidth={2.75} className="text-white"/>
          : <X size={20} strokeWidth={2.75} className="text-white "/>
        }
      </CropDialogMenuIcon>

    </div>
  )
}

const CropDialogMenuIcon = ({onPress, children}: React.PropsWithChildren & {
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
        e.preventDefault()
        e.stopPropagation()
        onPress()
      }}
      onTouchEndCapture={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onMouseUpCapture={(e) => {
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
