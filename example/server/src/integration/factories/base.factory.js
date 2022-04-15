import { Factory } from '@knowark/injectarkjs'
import {
  Authorizer, Locator
} from '#application/domain/common/index.js'
import { MemoryPortal } from '#application/domain/services/index.js'
import { TenantSupplier } from '#application/general/suppliers/index.js'
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
  authorizer () {
    return new Authorizer()
  }

  locator (authorizer) {
    return new Locator({ authorizer })
  }

  portal(locator) {
    return new MemoryPortal({ locator })
  }

  tenantSupplier () {
    return new TenantSupplier()
  }

  sessionProxy (authorizer, tenantSupplier) {
    return new SessionProxy({ authorizer, tenantSupplier })
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
