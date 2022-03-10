import { Factory } from '@knowark/injectarkjs'                                                 
import { MemoryPortal } from 'application/domain/services'
import { StandardManager, SessionManager } from 'application/operation/managers'

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
