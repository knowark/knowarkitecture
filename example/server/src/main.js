import { Injectark } from '@knowark/injectarkjs'
import { FACTORIES } from './integration/factories/index.js'
import { Shell } from './presentation/system/shell.js'

/* istanbul ignore next */
export async function main (context) {
  const config = context.config
  const factory = FACTORIES[config.factory](config)
  const injector = new Injectark({ factory })

  await (new Shell({ injector })).run(context)
}
