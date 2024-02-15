import { type Plugin } from '@ttab/textbit'

export const ListItem = ({ children }: Plugin.ComponentProps): JSX.Element => {
  return <li role="listitem" style={{ paddingLeft: '0.8rem', paddingBottom: '0.6rem' }}>
    {children}
  </li>
}
