import { JSDOM } from 'jsdom'
import supertest from "supertest"
import { describe, it, expect, beforeEach } from '@jest/globals'
import { Injectark } from '@knowark/injectarkjs'
import { RestApplication } from "#presentation/platform/rest/index.js" 
import { FACTORIES } from "#integration/factories/index.js" 

describe('RestApplication', () => {
  let application = null

  beforeEach(() => {
    const factory = FACTORIES['check']({})
    const injector = new Injectark({ factory })

    application = new RestApplication({ injector })
    expect(application).toBeTruthy()
  })

  it('can be instantiated', () => {
    expect(application).toBeTruthy()
  })

  it('shows the api documentation on the root path', async () => {
    const server = supertest.agent(application.app)

    const result = await server.get('/')

    const dom = new JSDOM(result.text)
    const title = dom.window.document.querySelector('title').textContent
    expect(title.includes('Tutorark')).toBeTruthy()
  })

  it('shows the api json document on the root path', async () => {
    const server = supertest.agent(application.app)

    const result = await server.get('/?api')

    const api = JSON.parse(result.text)
    expect(api.info.title).toEqual('Tutorark')
  })

  it('gets a model given the url', async () => {
    const server = supertest.agent(application.app)

    const result = await server.get('/settings')

    expect(Object(result.body) === result.body).toBeTruthy()
    expect(result.body).toEqual({ data: [] })
  })

  it('sets a model patching its url', async () => {
    const server = supertest.agent(application.app)
    const data = {
      meta: {},
      data: [
        { userId: 'U001', name: 'color', value: '#00ffff' }
      ]
    }

    const result = await server.patch('/settings').send(data)

    const response = result.body
    expect(Object(response) === response).toBeTruthy()
    expect(response.data[0].id.length > 0).toBeTruthy()
    expect(response.data[0].createdAt > 0).toBeTruthy()
    expect(response.data[0].createdBy).toEqual('default')
    expect(response.data[0].updatedAt > 0).toBeTruthy()
    expect(response.data[0].updatedBy).toEqual('default')
    expect(response.data[0].name).toEqual('color')
    expect(response.data[0].value).toEqual('#00ffff')
  })

  it('gets a model total count of elements in a head request', async () => {
    const server = supertest.agent(application.app)

    const result = await server.head('/settings')

    expect(result.headers.count).toEqual('0')
  })

  it('deletes a model item through the delete method', async () => {
    const server = supertest.agent(application.app)
    const data = {
      meta: {},
      data: [
        { id: 'S001', userId: 'U001', name: 'color', value: '#00ffff' }
      ]
    }
    let result = await server.patch('/settings').send(data)
    const response = result.body
    expect(response.data[0].id).toEqual('S001')
    expect(response.data[0].name).toEqual('color')
    expect(response.data[0].value).toEqual('#00ffff')
    expect(response.data.length).toEqual(1)

    result = await server.delete('/settings/S001')

    result = await server.get('/settings')
    expect(result.body).toEqual({ data: [] })
  })
})
