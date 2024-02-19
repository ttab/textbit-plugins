import { type Plugin } from '@ttab/textbit'
import { textStyles } from '../textStyles'

export const Text = (props: Plugin.ComponentProps): JSX.Element => {
  const { children, element } = props
  const style = textStyles.find(t => t.type === element?.properties?.type)

  if (style && !style.type) {
    // Regular text
    return <>
      {children}
    </>
  } else if (style) {
    // Specific text style
    return <div className={`core/text-${style.type}`}>
      {children}
    </div>
  } else {
    return <div className="core/text-unknown">
      {children}
    </div>
  }
}
