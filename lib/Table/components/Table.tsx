import type { Plugin } from '@ttab/textbit'

export const Table = (props: Plugin.ComponentProps): JSX.Element => {
  return (
    <table className='w-full border table-fixed border-separate rounded border-spacing-0 m-0 p-0'>
      <tbody>
        {props.children}
      </tbody>
    </table>
  )
}
