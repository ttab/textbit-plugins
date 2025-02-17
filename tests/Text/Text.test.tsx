import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Text } from '../../lib/Text/components'
import { Plugin } from '@ttab/textbit'

vi.mock('slate-react', () => ({
  useSelected: vi.fn(),
  useContext: vi.fn()
}))

describe('Minimal test', () => {
  const text = 'A heading'

  const renderElementProps: Plugin.ComponentProps = {
    children: [text],
    element: {
      type: 'core/text',
      id: '538345e5-bacc-48f9-8ef1-a219891b60eb',
      class: 'text',
      properties: {
        type: 'h1'
      },
      children: [{ text }]
    }
  }

  it('should render correctly', () => {
    render(<Text {...renderElementProps} />)

    expect(screen.getByText(text)).toBeInTheDocument()
    expect(screen.getByText(text)).toContainHTML(`${text}`)
  })
})
