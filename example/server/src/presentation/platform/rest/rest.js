import fs from 'fs';
import url from 'url';
import path from 'path';
import express from 'express'
import nunjucks from 'nunjucks'
import { Resource } from './resources/resource.js'
import * as middleware from './middleware/index.js'

export class RestApplication {
  constructor ({ injector, interceptors = [] }) {
    const config = injector.config
    const dirname = path.dirname(
      url.fileURLToPath(import.meta.url))
    this.spec = JSON.parse(fs.readFileSync(
      dirname + '/openapi.json'))

    this.app = express()
    interceptors.forEach(
      interceptor => this.app.use(interceptor))
    this.app.use(express.json())
    this.app.use(middleware.accessMiddleware({ config }))
    nunjucks.configure(dirname + '/views', {
      autoescape: true,
      express: this.app
    })
    this.app.use(middleware.errorMiddleware({ config }))

    this.app.get('/', (request, response) => {
      if ('api' in request.query) return response.json(this.spec)
      const context = {url: '/?api', version: '0.1.0'}
      response.render('api.html', context)
    })

    for (const [route, methods] of Object.entries(this.spec.paths)) {
      for (const [method, definition]  of Object.entries(methods)) {
        const resource = new Resource({ injector, route, definition })
        this.app[method]([route, `${route}/:id`],
          resource[method].bind(resource))
      }
    }
  }

  /* istanbul ignore next */
  async run (options) {
    this.app.listen(options.port, () => {
       console.info(`Tutorark listening on port ${options.port}...`)
    })
  }
}
