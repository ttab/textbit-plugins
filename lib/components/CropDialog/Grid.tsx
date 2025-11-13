import { GridLine } from './GridLine'

export const Grid = () => {
  return (
    <>
      <GridLine direction='horizontal' offset={33} />
      <GridLine direction='horizontal' offset={67} />
      <GridLine direction='vertical' offset={33} />
      <GridLine direction='vertical' offset={67} />
    </>
  )
}
