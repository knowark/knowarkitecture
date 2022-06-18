import { SqlRepository } from '@knowark/modelark/lib/repository/index.js'
import { Portal } from '#application/domain/services/portal.js'
import * as models from '#application/domain/models/index.js'

export class SqlPortal extends Portal {
  constructor({ locator, connector }) {
    const repositories = [
      new SqlRepository({ model: models.Course, locator, connector,
        collection: 'courses' }),
      new SqlRepository({ model: models.Enrolment, locator, connector,
        collection: 'enrolments' }),
      new SqlRepository({ model: models.Lesson, locator, connector,
        collection: 'lessons' }),
      new SqlRepository({ model: models.Student, locator, connector,
        collection: 'students' }),
      new SqlRepository({ model: models.Teacher, locator, connector,
        collection: 'teachers' }),
      new SqlRepository({ model: models.Setting, locator, connector,
        collection: 'settings'}),
    ]
    super({ repositories })
  }
}
