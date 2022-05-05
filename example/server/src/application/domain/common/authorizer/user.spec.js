import { describe, it, expect, beforeEach } from '@jest/globals'
import { User, SystemUser, AnonymousUser, ZERO_ID, ONE_ID } from './user.js'

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
        expect(user.namespace).toEqual('')
        expect(user.zone).toEqual('')
        expect(user.active).toEqual(true)
    })

    it('defines a system user', () => {
        user = new SystemUser()
        expect(user.id).toEqual(ZERO_ID)
        expect(user.name).toEqual('system')
        expect(user.tenant).toEqual('system')
        expect(user.tenantId).toEqual(ZERO_ID)
        expect(user.organization).toEqual('system')
        expect(user.namespace).toEqual('system')
    })

    it('defines an anonymous user', () => {
        user = new AnonymousUser()
        expect(user.id).toEqual(ONE_ID)
        expect(user.name).toEqual('anonymous')
        expect(user.tenant).toEqual('anonymous')
        expect(user.tenantId).toEqual(ONE_ID)
        expect(user.organization).toEqual('anonymous')
        expect(user.namespace).toEqual('anonymous')
    })
})
