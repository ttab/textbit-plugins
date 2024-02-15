import { type Plugin } from '@ttab/textbit'

export const List = ({ element, children }: Plugin.ComponentProps): JSX.Element => {
  const style = {
    margin: 0,
    paddingLeft: '1.8rem',
    marginBottom: '-0.8rem'
  }

  return element.type === 'core/number-list'
    ? <ol role="list" style={style}>{children}</ol>
    : <ul role="list" style={style}>{children}</ul>
}
