import fs from 'fs';
import url from 'url';
import path from 'path';
import express from 'express'
import nunjucks from 'nunjucks'
import { Resource } from './resources/resource.js'

export class RestApplication {
  constructor ({ injector }) {
    const dirname = path.dirname(
      url.fileURLToPath(import.meta.url))
    this.spec = JSON.parse(fs.readFileSync(
      dirname + '/openapi.json'))

    this.app = express()
    this.app.use(express.json())
    nunjucks.configure(dirname + '/views', {
      autoescape: true,
      express: this.app
    })

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
