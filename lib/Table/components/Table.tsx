import { type Plugin } from '@ttab/textbit'

export const Table = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return (
    <table className='w-full border-2 table-fixed overflow-x-scroll'>
      <tbody className='divide-y'>
        {children}
      </tbody>
    </table>
  )
}
