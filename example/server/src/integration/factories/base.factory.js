import { Factory } from '@knowark/injectarkjs'                                                 

export class BaseFactory extends Factory {                                                     
  constructor (config) {                                                                       
    super()                                                                                    
    this.config = config                                                                       
    //this.sessionManager.dependencies = ['AuthService', 'IdentitySupplier']                     
    //this.uploadManager.dependencies = ['MediaService', 'IdentifierService']                    
    //this.contactManager.dependencies = ['QueryService', 'IdentifierService']                   
    //this.productManager.dependencies = ['QueryService', 'IdentifierService']                   
    //this.orderManager.dependencies = ['QueryService', 'IdentifierService']                     
    //this.websiteManager.dependencies = ['QueryService', 'IdentifierService']      
  }
}
