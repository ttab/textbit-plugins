import 'jest'
import { consumes } from '../../lib/Image/lib/consumes'

describe('Image plugin consumer', () => {
  it('should consume image/jpg', async () => {
    const resource = {
      input: {
        source: '',
        type: 'file',
        data: new File(['...'], 'image.jpg', { type: 'image/jpg' })
      }
    }

    expect(consumes(resource)).toEqual([true, 'core/image', false])
  })

  it('should not consume text/text', async () => {
    const resource = {
      input: {
        source: '',
        type: 'file',
        data: new File(['...'], 'doc.txt', { type: 'text/text' })
      }
    }

    expect(consumes(resource)).toEqual([false])
  })
})
