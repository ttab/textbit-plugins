import styles from './styles.module.css'

export function Link(props: React.InputHTMLAttributes<HTMLInputElement>): JSX.Element {
  const { className, ...restProps } = props

  return <input {...props} className={`${className} ${styles.button}`} {...restProps} />
}
