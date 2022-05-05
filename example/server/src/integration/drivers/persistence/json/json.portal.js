import { JsonRepository } from '@knowark/modelark/lib/repository/index.js'
import { Portal } from '#application/domain/services/portal.js'
import {
  Course, Enrolment, Lesson, Student, Teacher, Setting
} from '#application/domain/models/index.js'

export class JsonPortal extends Portal {
  constructor({ locator, directory } = {}) {
    const repositories = [
      new JsonRepository({ model: Course, locator, directory,
        collection: 'courses' }),
      new JsonRepository({ model: Enrolment, locator, directory,
        collection: 'enrolments' }),
      new JsonRepository({ model: Lesson, locator, directory,
        collection: 'lessons' }),
      new JsonRepository({ model: Student, locator, directory,
        collection: 'students' }),
      new JsonRepository({ model: Teacher, locator, directory,
        collection: 'teachers' }),
      new JsonRepository({ model: Setting, locator, directory,
        collection: 'settings'}),
    ]
    super({ repositories })
  }
}
