import yargs from 'yargs'

export class Shell {
  async run(context) {
    const argv = yargs(context.argv).parse()
    console.log('yarg>>>', argv)
  }
}
