import type { TBComponentProps } from '@ttab/textbit'

export const TableRow = ({ children, ref }: TBComponentProps<HTMLTableRowElement>) => (
  <tr ref={ref}>{children}</tr>
)

TableRow.displayName = 'TableRow'
