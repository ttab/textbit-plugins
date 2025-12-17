import type { TBComponentProps } from '@ttab/textbit'
import { FocusBlock } from '../../components/FocusBlock'

export const Figure = ({ children }: TBComponentProps) => {
  return (
    <FocusBlock className='my-2'>
      <figure className="flex gap-1 flex-col min-h-10 rounded-sm">
        {children}
      </figure>
    </FocusBlock>
  )
}
