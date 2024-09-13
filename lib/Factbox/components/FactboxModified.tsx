interface Modified {
  modified?: string | undefined | boolean | number
}

export const FactboxModified = ({ modified = '' }: Modified): JSX.Element => {
  return (
    <div className='py-2 ps-2 opacity-70 font-semibold text-xs flex justify-between items-center gap-1'>
      <div>Senast ändrad</div>
      <div>{modified}</div>
    </div>
  )
}
