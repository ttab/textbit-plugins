import type { TBComponentProps } from '@ttab/textbit'
import { FocusBlock } from '../../components/FocusBlock'

export const OembedWrapper = ({ children }: TBComponentProps) => {
  return (
    <FocusBlock className='my-2'>
      <div className="flex gap-1 flex-col py-2 min-h-10 rounded-sm">
        {children}
      </div>
    </FocusBlock>
  )
}
