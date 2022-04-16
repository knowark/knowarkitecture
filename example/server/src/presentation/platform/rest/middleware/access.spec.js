import { describe, it, expect } from '@jest/globals'
import { accessMiddleware } from './access.js'

describe('AccessMiddleware', () => {
    it('returns a middleware function', () => {
        const result = accessMiddleware({})
        expect(result instanceof Function).toBeTruthy()
    })

    it('adds the authorization metadata to the request', () => {
        const mockRequest = {

        }

        const mockResponse = {}

        const mockNext = {}

        const middleware = accessMiddleware({})

    })
})
