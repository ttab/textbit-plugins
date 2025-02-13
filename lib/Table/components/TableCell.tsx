import { Plugin } from '@ttab/textbit'
import { forwardRef } from 'react'

export const TableCell = forwardRef<HTMLTableCellElement, Plugin.ComponentProps>(({children, element}, ref) => {
  const {colspan, rowspan} = element?.properties || {}

  return (
    <td ref={ref} className="py-2 px-2 border" colSpan={colspan ? Number(colspan) : undefined} rowSpan={rowspan ? Number(rowspan) : undefined}>
      {children}
    </td>
  )
})

TableCell.displayName = 'TableCell'
