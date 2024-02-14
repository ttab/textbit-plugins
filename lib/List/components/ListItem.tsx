import { Plugin } from '@ttab/textbit'

export const ListItem: Plugin.Component = ({ children }) => {
  return <li role="listitem" style={{ paddingLeft: '0.8rem', paddingBottom: '0.6rem' }}>
    {children}
  </li>
}
