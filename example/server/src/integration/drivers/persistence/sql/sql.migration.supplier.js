import path from 'path'
import pg from 'pg'
import { readdirSync, readFileSync } from 'fs'
import {
  MigrationSupplier
} from '#application/general/suppliers/index.js'

export class SqlMigrationSupplier extends MigrationSupplier {
  constructor (options = {}) {
    super()
    this.directory = options.directory || 'migrations'
    this.connection = options.connection
  }

  async migrate (options) {
    const namespace = options.namespace
    const client = new pg.Client(this.connection)
    await client.connect()

    let result = await client.query(
      `SELECT schema_name FROM information_schema.schemata `
      + `WHERE schema_name = '${namespace}'`)
    if (!result.rows.length) {
      await client.query(`CREATE SCHEMA ${namespace}`)
    }

    let currentVersion = 0
    try {
      const result = await client.query(
        `SELECT version FROM ${namespace}.migrations `
        + `ORDER BY created_at DESC LIMIT 1`)
      const [record] = result.rows
      currentVersion = parseInt(record.version)
    } catch (error) {
      currentVersion = 0
    }

    const directory = new URL(this.directory, import.meta.url);
    for (const file of readdirSync(directory)) {
      const [version] = file.split('.')

      if (version > currentVersion) {
        const content = readFileSync(
          path.join(directory.pathname, file), { encoding: 'utf8' })

        await client.query(`SET SCHEMA '${namespace}'`)
        await client.query(`${content}`)
        await client.query(
          `INSERT INTO ${namespace}.migrations `
          + `(version) VALUES ($1)`, [version])
      }
    }

    await client.end()
  }
}
