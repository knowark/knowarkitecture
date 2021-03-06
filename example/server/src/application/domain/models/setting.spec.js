import { describe, it, expect, beforeEach } from '@jest/globals'
import { Setting } from './setting.js'

describe('Setting', () => {
    let setting = null

    beforeEach(() => {
        setting = new Setting({
            id: 'S001',
            userId: 'U001',
            type: 'color',
            name: 'menu.color',
            value: '#00ffff',
            description: 'Menu Color'
        })
    })
    
    it('can be instantiated', () => {
        expect(setting).toBeTruthy()
    })

    it('can define its attributes', () => {
        expect(setting.id).toEqual('S001')
        expect(setting.userId).toEqual('U001')
        expect(setting.type).toEqual('color')
        expect(setting.name).toEqual('menu.color')
        expect(setting.value).toEqual('#00ffff')
        expect(setting.description).toEqual('Menu Color')
    })

    it('defines default attributes', () => {
        setting = new Setting()
        expect(setting.id.length > 0).toBeTruthy()
        expect(setting.userId).toEqual('')
        expect(setting.type).toEqual('')
        expect(setting.name).toEqual('')
        expect(setting.value).toEqual('')
        expect(setting.description).toEqual('')
    })
})
