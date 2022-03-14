import { Factory } from '@knowark/injectarkjs'
import { MemoryPortal } from '#application/domain/services/index.js'
import {
  StandardManager, SessionManager 
} from '#application/operation/managers/index.js'

export class BaseFactory extends Factory {                                                     
  portal () {
    return new MemoryPortal()
  }

  sessionManager () {
    return new SessionManager()
  }

  standardManager (portal) {
    return new StandardManager({ portal })
  }
}
