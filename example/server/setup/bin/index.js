#! /usr/bin/env node

import { config } from '../../src/integration/core/common/config.js'
import { main } from '../../src/main.js'

const argv = process.argv.slice(2)

await main({ config, argv })
