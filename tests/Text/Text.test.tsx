import { render, screen } from '@testing-library/react'
import { Text } from '../../lib/Text/components'
import { type RenderElementProps } from 'slate-react'
import '@testing-library/jest-dom'


describe('Text component', () => {
  const text = 'A heading'

  const renderElementProps: RenderElementProps = {
    children: [text],
    attributes: {
      'data-slate-node': 'element',
      ref: null
    },
    element: {
      type: 'core/text',
      id: '538345e5-bacc-48f9-8ef1-a219891b60eb',
      class: 'text',
      properties: {
        type: 'h1'
      },
      children: [
        { text }
      ]
    }
  }

  it('should render correctly', () => {
    render(<Text {...renderElementProps} />)

    expect(screen.getByText(text)).toBeInTheDocument()

    expect(screen.getByText(text)).toContainHTML(
      `<div class="core/text-h1">${text}</div>`
    )
  })
})
