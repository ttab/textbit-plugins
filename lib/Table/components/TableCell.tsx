import { forwardRef, type PropsWithChildren } from 'react'

export const TableCell = forwardRef<HTMLTableCellElement, PropsWithChildren>(({ children }, ref) => (
  <td ref={ref} className='py-2 px-2 border'>{children}</td>
))

TableCell.displayName = 'TableCell'
