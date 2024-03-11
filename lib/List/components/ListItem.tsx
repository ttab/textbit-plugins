import { type Plugin } from '@ttab/textbit'

export const ListItem = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return <div className="list-item pl-4">
    {children}
  </div>
}
