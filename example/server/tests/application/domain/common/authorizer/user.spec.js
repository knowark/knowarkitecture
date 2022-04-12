import { describe, it, expect, beforeEach } from '@jest/globals'
import { User } from '#application/domain/common/authorizer/index.js'

describe('User', () => {
    let user = null

    beforeEach(() => {
        user = new User({
            id: 'U001',
            name: 'John Doe',
            email: 'jdoe@knowark.com',
            tenant: 'knowark',
            tenantId: 'T001',
            organization: 'Knowark',
            zone: 'Z001',
            active: true
        })
    })
    
    it('can be instantiated', () => {
        expect(user).toBeTruthy()
    })

    it('can define its attributes', () => {
        expect(user.id).toEqual('U001')
        expect(user.name).toEqual('John Doe')
        expect(user.email).toEqual('jdoe@knowark.com')
        expect(user.tenant).toEqual('knowark')
        expect(user.tenantId).toEqual('T001')
        expect(user.organization).toEqual('Knowark')
        expect(user.zone).toEqual('Z001')
        expect(user.active).toEqual(true)
    })

    it('defines default attributes', () => {
        user = new User()
        expect(user.id).toEqual('')
        expect(user.name).toEqual('')
        expect(user.email).toEqual('')
        expect(user.tenant).toEqual('')
        expect(user.tenantId).toEqual('')
        expect(user.organization).toEqual('')
        expect(user.zone).toEqual('')
        expect(user.active).toEqual(true)
    })

    //it('defines default attributes', () => {
        //course = new Course()
        //expect(course.id.length > 0).toBeTruthy()
        //expect(course.name).toEqual('')
        //expect(course.description).toEqual('')
    //})
})
