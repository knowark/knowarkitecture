import yargs from 'yargs'
import { RestApplication } from '../platform/rest/index.js'

export class Shell {
  constructor({ injector }) {
    this.injector = injector
  }

  async run(context) {
    yargs(context.argv).command('serve [port]',
      'start the server', {
        port: {
          alias: 'p',
          default: 5000
        }
      }, async (options) => {
        const app = new RestApplication(
          { injector: this.injector })
        await app.run(options)
      }).parse()
  }
}
