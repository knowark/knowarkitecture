import { Factory } from '@knowark/injectarkjs'
import { selector } from './selector.js'

describe('Selector', function () {
  it('returns a factory object', function () {
    const config = {}
    const factories = selector()

    const names = ['base', 'check', 'json']
    for (const name of names) {
      const factory = factories[name](config) 
      expect(factory instanceof Factory)
    }
  })
})
