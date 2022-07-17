import { SqlRepository } from '@knowark/modelark/lib/repository/index.js'
import { Portal } from '#application/domain/services/portal.js'
import * as models from '#application/domain/models/index.js'

export class SqlPortal extends Portal {
  constructor({ locator, connector }) {
    const repositories = [
      new SqlRepository({ model: models.Course, locator, connector }),
      new SqlRepository({ model: models.Enrolment, locator, connector }),
      new SqlRepository({ model: models.Lesson, locator, connector }),
      new SqlRepository({ model: models.Setting, locator, connector }),
      new SqlRepository({ model: models.Student, locator, connector }),
      new SqlRepository({ model: models.Teacher, locator, connector }),
    ]
    super({ repositories })
  }
}
