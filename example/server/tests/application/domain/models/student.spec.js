import { describe, it, expect, beforeEach } from '@jest/globals'
import { Student } from 'application/domain/models/student.js'

describe('Student', () => {
    let student = null

    beforeEach(() => {
        student = new Student({
            id: 'S001',
            name: 'John Doe',
            identification: '12345',
            email: 'jdoe@example.com'
        })
    })
    
    it('can be instantiated', () => {
        expect(student).toBeTruthy()
    })

    it('can define its attributes', () => {
        expect(student.id).toEqual('S001')
        expect(student.name).toEqual('John Doe')
        expect(student.identification).toEqual('12345')
        expect(student.email).toEqual('jdoe@example.com')
    })

    it('defines default attributes', () => {
        student = new Student()
        expect(student.id.length > 0).toBeTruthy()
        expect(student.name).toEqual('')
        expect(student.identification).toEqual('')
        expect(student.email).toEqual('')
    })
})
