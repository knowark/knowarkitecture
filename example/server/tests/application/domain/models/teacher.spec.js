import { describe, it, expect, beforeEach } from '@jest/globals'
import { Teacher } from 'application/domain/models/teacher.js'

describe('Teacher', () => {
    let teacher = null

    beforeEach(() => {
        teacher = new Teacher({
            id: 'T001',
            name: 'Richard Roe',
            identification: '67890',
            email: 'rroe@example.com'
        })
    })
    
    it('can be instantiated', () => {
        expect(teacher).toBeTruthy()
    })

    it('can define its attributes', () => {
        expect(teacher.id).toEqual('T001')
        expect(teacher.name).toEqual('Richard Roe')
        expect(teacher.identification).toEqual('67890')
        expect(teacher.email).toEqual('rroe@example.com')
    })

    it('defines default attributes', () => {
        teacher = new Teacher()
        expect(teacher.id.length > 0).toBeTruthy()
        expect(teacher.name).toEqual('')
        expect(teacher.identification).toEqual('')
        expect(teacher.email).toEqual('')
    })
})
