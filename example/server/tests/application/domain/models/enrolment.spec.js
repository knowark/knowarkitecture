import { describe, it, expect, beforeEach } from '@jest/globals'
import { Enrolment } from '#application/domain/models/enrolment.js'

describe('Enrolment', () => {
    let enrolment = null

    beforeEach(() => {
        enrolment = new Enrolment({
            id: 'E001',
            courseId: 'C001',
            studentId: 'S001'
        })
    })
    
    it('can be instantiated', () => {
        expect(enrolment).toBeTruthy()
    })

    it('can define its attributes', () => {
        expect(enrolment.id).toEqual('E001')
        expect(enrolment.courseId).toEqual('C001')
        expect(enrolment.studentId).toEqual('S001')
    })

    it('defines default attributes', () => {
        enrolment = new Enrolment()
        expect(enrolment.id.length > 0).toBeTruthy()
        expect(enrolment.courseId).toEqual('')
        expect(enrolment.studentId).toEqual('')
    })
})
