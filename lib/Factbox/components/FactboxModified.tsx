import { formatDate } from "../lib/formatDate"

interface Modified {
  modified?: string | undefined | boolean | number
}

export const FactboxModified = ({ modified = '' }: Modified) => {
  if (modified) {
    const formatted = formatDate(modified as string)
    return (
      <div className='opacity-70 font-semibold text-xs flex justify-between items-center gap-1'>
        <div>Originalet är från</div>
        <div>{formatted}</div>
      </div>
    )
  }
  return <></>
}
