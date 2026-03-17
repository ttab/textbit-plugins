import type { TBComponentProps } from '@ttab/textbit'
import { Block } from '../../components/FocusBlock'

export const Figure = ({ children }: TBComponentProps) => {
  return (
    <Block className='my-2'>
      <figure className="flex gap-1 flex-col min-h-10 rounded-sm">
        {children}
      </figure>
    </Block>
  )
}
