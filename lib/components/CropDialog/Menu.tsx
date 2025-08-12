import { Crop, X, ZoomIn, ZoomOut, Undo2 } from 'lucide-react'
import { MenuOption } from './MenuOption'

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
            <MenuOption onPress={() => onZoom('in')}>
              <ZoomIn size={20} strokeWidth={1.75} className="text-white "/>
            </MenuOption>

            <MenuOption onPress={() => onZoom('out')}>
              <ZoomOut size={20} strokeWidth={1.75} className="text-white "/>
            </MenuOption>

            <MenuOption onPress={() => onReset()}>
              <Undo2 size={20} strokeWidth={1.75} className="text-white "/>
            </MenuOption>
          </>
        )
      }

      <MenuOption onPress={() => {onToggle(!active)}}>
        {!active
          ? <Crop size={20} strokeWidth={2.75} className="text-white"/>
          : <X size={20} strokeWidth={2.75} className="text-white "/>
        }
      </MenuOption>
    </div>
  )
}
