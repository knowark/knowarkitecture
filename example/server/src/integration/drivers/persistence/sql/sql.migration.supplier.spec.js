import pg from 'pg'
import {
  describe, it, expect, beforeEach, beforeAll, afterAll
} from '@jest/globals'
import {
  SqlMigrationSupplier
} from './sql.migration.supplier.js'

describe('SqlMigrationSupplier', () => {
  let migrationSupplier = null
  const testingDatabase = 'testing_migrations'
  const testingNamespace = 'sample'
  const setupConnection = {
    user: 'tutorark',
    password: 'tutorark',
    database: 'postgres'
  }

  beforeAll(async () => {
    const client = new pg.Client(setupConnection)
    await client.connect()
    await client.query(`DROP DATABASE IF EXISTS ${testingDatabase}`)
    await client.query(`CREATE DATABASE ${testingDatabase}`)
    await client.end()
  })

  beforeEach(() => {
    migrationSupplier = new SqlMigrationSupplier()
  })

  afterAll(async () => {
    const client = new pg.Client(setupConnection)
    await client.connect()
    await client.query(`DROP DATABASE IF EXISTS ${testingDatabase}`)
    await client.end()
  })

  it('can be instantiated', () => {
    expect(migrationSupplier).toBeTruthy()
  })

  it('can run the migration scripts over the given namespace', async () => {
    const connection = {
      user: 'tutorark',
      password: 'tutorark',
      database: testingDatabase
    }
    migrationSupplier = new SqlMigrationSupplier({ connection })

    await migrationSupplier.migrate({
      namespace: testingNamespace
    })
    await migrationSupplier.migrate({
      namespace: testingNamespace
    })

    const client = new pg.Client(connection)
    await client.connect()
    const result = await client.query(
      `SELECT schema_name FROM information_schema.schemata `
      + `WHERE schema_name = '${testingNamespace}'`)
    await client.end()
    expect(result.rows.length).toEqual(1)
  })
})
