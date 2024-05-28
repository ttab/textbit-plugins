import { type Plugin } from '@ttab/textbit'

export const TTVisualText = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return (
    <div className='text-sm bg-gray-100 text-black flex'>
      <label contentEditable={false} className="grow-0 w-16 opacity-60 p-1">Text:</label>
      <figcaption className='text-sm w-full p-1'>{children}</figcaption>
    </div>
  )
}
