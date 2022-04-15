import { Factory } from '@knowark/injectarkjs'
import { selector } from './selector.js'

describe('Selector', function () {
  it('returns a factory object', function () {
    const config = {}
    const factories = selector()

    const names = ['base', 'check']
    for (const name of names) {
      expect(factories[name](config) instanceof Factory)
    }
  })
})
