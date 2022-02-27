import { describe, it, expect, beforeEach } from '@jest/globals'
import { Contextor } from 'application/general/instruments/contextor.js'

describe('Contextor', () => {
    let contextor = null

    beforeEach(() => {
        contextor = new Contextor()
    })
    
    it('can be instantiated', () => {
        expect(contextor).toBeTruthy()
    })
})
