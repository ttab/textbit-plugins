import { type PropsWithChildren } from 'react'

export const TableRow = ({ children }: PropsWithChildren) => (
  <tr className='grid grid-flow-col'>{children}</tr>
)