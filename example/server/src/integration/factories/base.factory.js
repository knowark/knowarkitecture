import { Factory } from '@knowark/injectarkjs'
import {
  Contextor, Authorizer, Locator
} from '#application/domain/common/index.js'
import { MemoryPortal } from '#application/domain/services/index.js'
import {
  TenantSupplier, MemoryTenantRepository 
} from '#application/general/suppliers/index.js'
import {
  StandardInformer
} from '#application/operation/informers/index.js'
import {
  SessionProxy, ContextProxy, Wrapper
} from '#application/operation/common/proxies/index.js'
import {
  StandardManager, SetupManager 
} from '#application/operation/managers/index.js'

export class BaseFactory extends Factory {
  contextor () {
    return new Contextor()
  }

  authorizer (contextor) {
    return new Authorizer({ contextor })
  }

  locator (authorizer) {
    return new Locator({ authorizer })
  }

  portal (locator) {
    return new MemoryPortal({ locator })
  }

  tenantRepository () {
    return new MemoryTenantRepository()
  }

  tenantSupplier (tenantRepository) {
    return new TenantSupplier({ repository: tenantRepository })
  }

  contextProxy (contextor) {
    return new ContextProxy({ contextor })
  }

  sessionProxy (authorizer, tenantSupplier) {
    return new SessionProxy({ authorizer, tenantSupplier })
  }

  wrapper (contextProxy, sessionProxy) {
    return new Wrapper([contextProxy, sessionProxy])
  }

  standardInformer (portal, wrapper) {
    return wrapper.wrap(new StandardInformer({ portal }))
  }

  standardManager (portal, wrapper) {
    return wrapper.wrap(new StandardManager({ portal }))
  }

  setupManager () {
    return new SetupManager()
  }
}
