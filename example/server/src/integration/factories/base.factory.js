import { Factory } from '@knowark/injectarkjs'
import { MemoryPortal } from '#application/domain/services/index.js'
import {
  StandardInformer
} from '#application/operation/informers/index.js'
import {
  SessionProxy, Wrapper
} from '#application/operation/common/proxies/index.js'
import {
  StandardManager, SessionManager 
} from '#application/operation/managers/index.js'

export class BaseFactory extends Factory {                                                     
  portal () {
    return new MemoryPortal()
  }

  sessionProxy () {
    return new SessionProxy()
  }

  wrapper (sessionProxy) {
    return new Wrapper([sessionProxy])  
  }

  standardInformer (portal, wrapper) {
    return wrapper.wrap(new StandardInformer({ portal }))
  }

  standardManager (portal, wrapper) {
    return wrapper.wrap(new StandardManager({ portal }))
  }

  sessionManager () {
    return new SessionManager()
  }
}
