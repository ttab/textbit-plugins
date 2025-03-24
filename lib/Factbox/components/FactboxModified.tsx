import { formatDate } from "../lib/formatDate"

interface Modified {
  modified?: string | undefined | boolean | number
}

export const FactboxModified = ({ modified = '' }: Modified): JSX.Element => {
  if (modified) {
    const formatted = formatDate(modified as string)
    return (
      <div className='opacity-70 font-semibold text-xs flex justify-between items-center gap-1'>
        <div>Senast ändrad</div>
        <div>{formatted}</div>
      </div>
    )
  }
  return <></>
}
