import { JsonRepository } from '@knowark/modelark/lib/repository/index.js'
import { Portal } from '#application/domain/services/portal.js'
import * as models from '#application/domain/models/index.js'

export class JsonPortal extends Portal {
  constructor({ locator, directory } = {}) {
    const repositories = [
      new JsonRepository({ model: models.Course, locator, directory,
        collection: 'courses' }),
      new JsonRepository({ model: models.Enrolment, locator, directory,
        collection: 'enrolments' }),
      new JsonRepository({ model: models.Lesson, locator, directory,
        collection: 'lessons' }),
      new JsonRepository({ model: models.Student, locator, directory,
        collection: 'students' }),
      new JsonRepository({ model: models.Teacher, locator, directory,
        collection: 'teachers' }),
      new JsonRepository({ model: models.Setting, locator, directory,
        collection: 'settings'}),
    ]
    super({ repositories })
  }
}
