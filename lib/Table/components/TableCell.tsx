import { type PropsWithChildren } from "react"

export const TableCell = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <td className='p-2'>{children}</td>
  )
}