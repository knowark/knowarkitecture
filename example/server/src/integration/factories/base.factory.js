import { Factory } from '@knowark/injectarkjs'
import { Contextor, Locator } from '#application/domain/common/index.js'
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
  contextor () {
    return new Contextor()
  }

  locator (contextor) {
    return new Locator({ contextor })
  }

  portal(locator) {
    return new MemoryPortal({ locator })
  }

  sessionProxy (contextor) {
    return new SessionProxy({ contextor })
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
