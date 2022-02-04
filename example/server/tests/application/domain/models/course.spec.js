import { describe, it, expect, beforeEach } from '@jest/globals'
import { Course } from 'application/domain/models/course.js'

describe('Course', () => {
    let course = null

    beforeEach(() => {
        course = new Course({
            id: 'C001',
            name: 'Ancient Philosophy',
            description: 'The study of Greek and Roman philosophers'
        })
    })
    
    it('can be instantiated', () => {
        expect(course).toBeTruthy()
    })

    it('can define its attributes', () => {
        expect(course.id).toEqual('C001')
        expect(course.name).toEqual('Ancient Philosophy')
        expect(course.description).toEqual(
            'The study of Greek and Roman philosophers')
    })

    it('can define its attributes', () => {
        expect(course.id).toEqual('C001')
        expect(course.name).toEqual('Ancient Philosophy')
        expect(course.description).toEqual(
            'The study of Greek and Roman philosophers')
    })
})
