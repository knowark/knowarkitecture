import { describe, it, expect, beforeEach } from '@jest/globals'
import { Lesson } from 'application/domain/models/lesson.js'

describe('Lesson', () => {
    let lesson = null

    beforeEach(() => {
        lesson = new Lesson({
            id: 'L001',
            courseId: 'C001',
            name: 'Understanding Socrates'
        })
    })
    
    it('can be instantiated', () => {
        expect(lesson).toBeTruthy()
    })

    it('can define its attributes', () => {
        expect(lesson.id).toEqual('L001')
        expect(lesson.courseId).toEqual('C001')
        expect(lesson.name).toEqual('Understanding Socrates')
    })

    it('defines default attributes', () => {
        lesson = new Lesson()
        expect(lesson.id.length > 0).toBeTruthy()
        expect(lesson.courseId).toEqual('')
        expect(lesson.name).toEqual('')
    })
})
