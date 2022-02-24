import { describe, it, expect, beforeEach } from '@jest/globals'
import { 
    SessionManager 
} from 'application/operation/managers/session.manager.js'

describe('SessionManager', () => {
    let manager = null

    beforeEach(() => {
        manager = new SessionManager()
    })
    
    it('can be instantiated', () => {
        expect(manager).toBeTruthy()
    })

    //it('adds items of the given model', async () => {
        //const entry = {
            //meta: {
                //model: 'Course'
            //},
            //data: [
                //{ id: 'C001', name: 'Entrepreneurship' }
            //]
        //}

        //const data = manager.portal.get('Course').storer.data

        //await manager.add(entry)

        //expect(data['default']['C001'].name).toEqual('Entrepreneurship')
    //})

    //it('removes items of the given model', async () => {
        //let entry = {
            //meta: {
                //model: 'Lesson'
            //},
            //data: [
                //{ id: 'L001', courseId: 'C001', name: 'Journey Design' }
            //]
        //}
        //const data = manager.portal.get('Lesson').storer.data
        //await manager.add(entry)
        //expect(data['default']['L001'].name).toEqual('Journey Design')

        //entry = {
            //meta:{
                //model: 'Lesson'
            //},
            //data: [
                //{ id: 'L001' }
            //]
        //}

        //await manager.delete(entry)
        //expect(data['default']['C001']).toBeUndefined()
    //})
})

