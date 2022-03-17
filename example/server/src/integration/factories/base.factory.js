import { Factory } from '@knowark/injectarkjs'
import { MemoryPortal } from '#application/domain/services/index.js'
import {
  StandardInformer
} from '#application/operation/informers/index.js'
import {
  StandardManager, SessionManager 
} from '#application/operation/managers/index.js'

export class BaseFactory extends Factory {                                                     
  portal () {
    return new MemoryPortal()
  }

  standardInformer (portal) {
    return new StandardInformer({ portal })
  }

  sessionManager () {
    return new SessionManager()
  }

  standardManager (portal) {
    return new StandardManager({ portal })
  }
}
