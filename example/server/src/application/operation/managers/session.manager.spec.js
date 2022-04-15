import { describe, it, expect, beforeEach } from '@jest/globals'
import { SessionManager } from './session.manager.js'

describe('SessionManager', () => {
    let manager = null

    beforeEach(() => {
        manager = new SessionManager()
    })
    
    it('can be instantiated', () => {
        expect(manager).toBeTruthy()
    })
})
