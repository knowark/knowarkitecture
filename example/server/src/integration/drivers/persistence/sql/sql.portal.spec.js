import pg from 'pg'
import {
  describe, beforeAll, beforeEach, afterAll, afterEach, it, expect
} from '@jest/globals'
import { SqlPortal } from './sql.portal.js'
import * as models from '#application/domain/models/index.js'
import { SqlMigrationSupplier } from './sql.migration.supplier.js'

describe('SqlPortal', () => {
  let locator = null
  let connection = null
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

    connection = new pg.Client({
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

  afterEach(async () => {
    await connection.end()
    connection = null
  })

  //afterAll(async () => {
    //const client = new pg.Client(
      //{ user: user, password: user, database: 'postgres' })
    //await client.connect()
    //await client.query(`DROP DATABASE IF EXISTS ${testingDatabase}`)
    //await client.end()
  //})

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
          id: '55785dca-f71e-46f0-8d1e-e3c58456c6a0',
          name: 'History',
          description: "Civilization's History" })
      ],
      Enrolment: [
        new models.Enrolment({
          courseId: '6b4c4495-7fd8-4316-95b8-dc96a9fb5d0c',
          studentId: 'f8780a97-9f72-482e-b18a-c99d5b8400b7' 
        })
      ],
      Lesson: [
        new models.Lesson({
          courseId: '58c2613d-6ddf-4224-b634-7b6f47d576f7',
          name: 'The Rise of the Roman Empire',
        })
      ],
      Setting: [
        new models.Setting({
          id: 'b78135cd-2c25-4022-8ccc-2d6031582dd4',
          userId: 'a1cef388-e89f-46ee-af4c-5793fdb118bb',
          type: 'color',
          name: 'menu.color',
          value: '#334455'
        })
      ]
    }

    for (const [name, records] of Object.entries(cases)) {
      const repository = portal.get(name)
      const items = await repository.add(records)

      expect(items.length).toEqual(records.length)
    }
  })
})
