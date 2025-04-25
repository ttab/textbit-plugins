import type { Plugin } from '@ttab/textbit'
import { FocusBlock } from '../../components/FocusBlock'

export const Blockquote = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return (
    <FocusBlock className='my-2'>
      <div className='px-6 py-4 border-l-8 border-l-slate-200 group-data-[state="active"]:rounded'>
        {children}
      </div>
    </FocusBlock>
  )
}
