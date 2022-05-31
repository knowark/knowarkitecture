import { jest, describe, it, expect, beforeEach } from '@jest/globals'
import { Injectark } from '@knowark/injectarkjs'
import { FACTORIES } from "#integration/factories/index.js" 
import { Shell } from "#presentation/system/index.js" 
import '#presentation/platform/rest/index.js'
jest.mock('#presentation/platform/rest/index.js')

describe('Shell', () => {
  let shell = null

  beforeEach(() => {
    const factory = FACTORIES['check']({})
    const injector = new Injectark({ factory })

    shell = new Shell({ injector })
    expect(shell).toBeTruthy()
  })

  it('can be instantiated', () => {
    expect(shell).toBeTruthy()
  })

  it('can be instantiated without arguments', () => {
    shell = new Shell()
    expect(shell.injector).toBe(null)
  })

  it('runs the serve command', async () => {
    let expectedAttributes = null
    let expectedOptions = null
    const mockInjector = {}
    class MockRest {
      constructor(attributes) {
        expectedAttributes = attributes
      }
      async run(options) {
        expectedOptions = options
      }
    }
    shell = new Shell({ injector: mockInjector, rest: MockRest })
    const context = { argv: ['serve'] }

    await shell.run(context)

    expect(shell.rest).toBe(MockRest)
    expect(expectedAttributes).toEqual({ injector: mockInjector })
    expect(expectedOptions).not.toBeNull()
  })

  it('runs the migrate command', async () => {
    const context = { argv: ['migrate'] }

    await shell.run(context)

    //expect(shell.rest).toBe(MockRest)
    //expect(expectedAttributes).toEqual({ injector: mockInjector })
  })
})
