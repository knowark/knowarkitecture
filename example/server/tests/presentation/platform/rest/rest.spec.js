import { JSDOM } from 'jsdom'
import supertest from "supertest"
import { describe, it, expect, beforeEach } from '@jest/globals'
import { RestApplication } from "#presentation/platform/rest/index.js" 

describe('RestApplication', () => {
  let application = null

  beforeEach(() => {
    const injector = {}
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
})
