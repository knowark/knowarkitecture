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

    const response = JSON.parse(result.text)
    expect(Object(response) === response).toBeTruthy()
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
})
