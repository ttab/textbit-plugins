import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Factbox } from '../../lib/Factbox/components/Factbox'
import type { TBComponentProps } from '@ttab/textbit'
import { createEditor } from 'slate'

const NODE_ID = '11111111-1111-1111-1111-111111111111'
const SOURCE_ID = '22222222-2222-2222-2222-222222222222'
const EDIT_TITLE = 'Edit the original factbox'

const editor = createEditor()

const makeProps = (
  properties: Record<string, string>,
  options: Record<string, unknown> = {}
): TBComponentProps => ({
  editor,
  children: ['factbox body'],
  options,
  element: {
    id: NODE_ID,
    class: 'block',
    type: 'core/factbox',
    properties,
    children: [{ text: 'factbox body' }]
  }
})

const editButton = (container: HTMLElement) => container.querySelector(`[title="${EDIT_TITLE}"]`)

describe('Factbox: "Edit the original factbox" visibility', () => {
  it('renders the button when original_id points at another document', () => {
    const onEditOriginal = vi.fn()
    const { container } = render(
      <Factbox {...makeProps({ original_id: SOURCE_ID }, { onEditOriginal })} />
    )

    const button = editButton(container)
    if (!button) {
      throw new Error('expected the edit original button to be rendered')
    }

    fireEvent.mouseDown(button)
    expect(onEditOriginal).toHaveBeenCalledWith(SOURCE_ID)
  })

  it('hides the button for a newly created factbox where original_id is the node id', () => {
    const { container } = render(
      <Factbox {...makeProps({ original_id: NODE_ID }, { onEditOriginal: vi.fn() })} />
    )

    expect(editButton(container)).toBeNull()
  })

  it('hides the button when there is no original_id', () => {
    const { container } = render(
      <Factbox {...makeProps({}, { onEditOriginal: vi.fn() })} />
    )

    expect(editButton(container)).toBeNull()
  })

  it('hides the button when no onEditOriginal handler is given', () => {
    const { container } = render(
      <Factbox {...makeProps({ original_id: SOURCE_ID })} />
    )

    expect(editButton(container)).toBeNull()
  })
})

const removeIcon = (container: HTMLElement) => container.querySelector('.lucide-x')

describe('Factbox: remove button visibility', () => {
  it('always shows the remove button when removable, without requiring hover', () => {
    const { container } = render(
      <Factbox {...makeProps({}, { removable: true })} />
    )

    const icon = removeIcon(container)
    if (!icon) {
      throw new Error('expected the remove button to be rendered')
    }

    // No ancestor may gate the button behind hover
    const gated: string[] = []
    let node = icon.parentElement

    while (node && node !== container) {
      const classes = Array.from(node.classList)

      if (classes.includes('hidden') || classes.some((cls) => cls.startsWith('group-hover:'))) {
        gated.push(node.className)
      }

      node = node.parentElement
    }

    expect(gated).toEqual([])
  })

  it('does not render the remove button when not removable', () => {
    const { container } = render(
      <Factbox {...makeProps({}, {})} />
    )

    expect(removeIcon(container)).toBeNull()
  })
})
