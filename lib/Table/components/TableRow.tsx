import { forwardRef, type PropsWithChildren } from 'react'

export const TableRow = forwardRef<HTMLTableRowElement, PropsWithChildren>(({ children }, ref) => (
  <tr ref={ref}>{children}</tr>
))

TableRow.displayName = 'TableRow'