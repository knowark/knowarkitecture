import { JSDOM } from 'jsdom'
import supertest from "supertest"
import { jest, describe, it, expect, beforeEach } from '@jest/globals'
import { Injectark } from '@knowark/injectarkjs'
import { RestApplication } from "#presentation/platform/rest/index.js" 
import { FACTORIES } from "#integration/factories/index.js" 

const accessToken = () => {
  return (
    // secret: dev
    // Payload:
    // {
    //     "tid": "001",
    //     "uid": "001",
    //     "tenant": "Default",
    //     "name": "johndoe",
    //     "email": "john@doe.com"
    // }
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9." +
    "eyJ0aWQiOiIwMDEiLCJ1aWQiOiIwMDEiLCJ0ZW" +
    "5hbnQiOiJEZWZhdWx0IiwibmFtZSI6ImpvaG5kb" +
    "2UiLCJlbWFpbCI6ImpvaG5AZG9lLmNvbSJ9.ytpW" +
    "Kst-PB6ebHVAVrqp6-gO4AE3HKppv2tOzsNMtng"
  )
}

describe('RestApplication', () => {
  let application = null
  let injector = null
  let factory = null 

  beforeEach(() => {
    factory = FACTORIES['check']({})
    injector = new Injectark({ factory })
    application = new RestApplication({ injector })
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
    const token = accessToken()

    const result = await server.get('/settings').set(
      'Authorization', token)

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
    const token = accessToken()

    const result = await server.patch('/settings').send(data).set(
      'Authorization', token)

    const response = result.body
    expect(Object(response) === response).toBeTruthy()
    expect(response.data[0].id.length > 0).toBeTruthy()
    expect(response.data[0].createdAt > 0).toBeTruthy()
    expect(response.data[0].createdBy).toEqual('001')
    expect(response.data[0].updatedAt > 0).toBeTruthy()
    expect(response.data[0].updatedBy).toEqual('001')
    expect(response.data[0].name).toEqual('color')
    expect(response.data[0].value).toEqual('#00ffff')
  })

  it('deletes a model item through the delete method', async () => {
    const server = supertest.agent(application.app)
    const data = {
      meta: {},
      data: [
        { id: 'S001', userId: 'U001', name: 'color', value: '#00ffff' }
      ]
    }
    const token = accessToken()
    let result = await server.patch('/settings').send(data).set(
      'Authorization', token)
    const response = result.body
    expect(response.data[0].id).toEqual('S001')
    expect(response.data[0].name).toEqual('color')
    expect(response.data[0].value).toEqual('#00ffff')
    expect(response.data.length).toEqual(1)

    result = await server.delete('/settings/S001').set(
      'Authorization', token)

    result = await server.get('/settings').set(
      'Authorization', token)
    expect(result.body).toEqual({ data: [] })
  })

  it('decodes Authorization header if provided', async () => {
    let meta = null
    const interceptors = [(request, response, next) => {
      next()
      meta = request.meta
    }]
    application = new RestApplication({ injector, interceptors })
    const server = supertest.agent(application.app)
    const token = accessToken()

    const result = await server.get('/settings').set(
      'Authorization', token)

    expect(Object(result.body) === result.body).toBeTruthy()
    expect(result.body).toEqual({ data: [] })
    expect(meta.authorization.id).toEqual('001')
    expect(meta.authorization.tenantId).toEqual('001')
    expect(meta.authorization.name).toEqual('johndoe')
    expect(meta.authorization.email).toEqual('john@doe.com')
  })

  it('verifies Authorization header if a secret is provided', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    factory.config.secret = {
      token: 'OTHER_SECRET'
    }
    const interceptors = [(request, response, next) => {
      next()
      meta = request.meta
    }]
    application = new RestApplication({ injector, interceptors })
    const server = supertest.agent(application.app)
    const token = accessToken()

    const result = await server.get('/settings').set(
      'Authorization', token)

    expect(result.status).toEqual(500)
    expect(result.body.errors[0].name).toEqual('JsonWebTokenError')
    console.error.mockRestore()
  })
})
