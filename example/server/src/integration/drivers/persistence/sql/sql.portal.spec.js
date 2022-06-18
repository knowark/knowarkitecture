import pg from 'pg'
import { describe, beforeAll, beforeEach, it, expect } from '@jest/globals'
import { SqlPortal } from './sql.portal.js'
import * as models from '#application/domain/models/index.js'
import { SqlMigrationSupplier } from './sql.migration.supplier.js'

describe('SqlPortal', () => {
  let locator = null
  let connector = null
  let portal = null

  const user = 'tutorark'
  const testingDatabase = 'testing_repositories'
  const testingEditor = 'testing_editor'
  const testingNamespace = 'organization'

  beforeAll(async () => {
    const client = new pg.Client({
      user: user, password: user, database: 'postgres'
    })
    await client.connect()
    await client.query(`DROP DATABASE IF EXISTS ${testingDatabase}`)
    await client.query(`CREATE DATABASE ${testingDatabase} OWNER ${user}` )
    await client.end()

    const migrationSupplier = new SqlMigrationSupplier({
      connection: {
        user: 'tutorark',
        password: 'tutorark',
        database: testingDatabase
      }
    })

    await migrationSupplier.migrate({
      namespace: testingNamespace
    })
  })

  beforeEach(async () => {
    locator = {
      reference () {
        return testingEditor
      },

      location () {
        return testingNamespace
      }
    }

    const connection = new pg.Client({
      user: 'tutorark',
      password: 'tutorark',
      database: testingDatabase
    })
    await connection.connect()

    connector = {
      async get () {
        return connection
      }
    }

    portal = new SqlPortal({ locator, connector })

  })

  it('can be instantiated', () => {
    portal = new SqlPortal({ locator, connector })
    expect(portal).toBeTruthy()
  })

  it('retrieves a repository for each model', () => {
    for (const model of Object.values(models)) {
      const repository = portal.get(model.name)
      expect(repository.constructor.name).toBe('SqlRepository')
      expect(repository.model.name).toBe(model.name)
    }
  })

  it('persists the different models of the application', async () => {
    const cases = {
      Course: [
        new models.Course({
          name: 'History',
          description: "Civilization's History" })
      ]
    }

    for (const [name, records] of Object.entries(cases)) {
      const repository = portal.get(name)
      const items = await repository.add(records)

      expect(items.length).toEqual(records.length)
    }
  })
})
