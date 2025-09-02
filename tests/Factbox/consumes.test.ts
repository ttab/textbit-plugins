import { describe, it, expect } from 'vitest'
import { consumes } from '../../lib/Factbox/lib/consumes'

describe('Factbox plugin consumer', () => {
  it('should consume core/factbox', async () => {
    const resource = {
      input: {
        source: '',
        type: 'core/factbox',
        data: ''
      }
    }

    expect(consumes(resource)).toEqual([true, 'core/factbox'])
  })
})
