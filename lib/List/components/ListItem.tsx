import type { TBComponentProps } from '@ttab/textbit'

export const ListItem = ({ children }: TBComponentProps) => {
  return <div className="list-item pl-4">
    {children}
  </div>
}
