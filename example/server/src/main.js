//import { Injectark } from '@knowark/injectarkjs'
//import { FACTORIES } from './integration/factories'
//import {                
  //setMainRoutes                        
//} from './presentation/platform/web/screens/screens.routes'
import { Shell } from './presentation/system/shell.js'
    
/* istanbul ignore next */
export async function main (context) {                          
  //const factory = FACTORIES[config.factory](config)            
  //const injector = new Injectark({ factory })                  
                                                               
  //const mainComponent = document.querySelector('main')         
  //mainComponent.addEventListener('resolve', (event) => {       
    //const resource = event.detail.resource                     
    //event.detail[resource] = injector.resolve(resource)        
  //})                                                           
                                                               
  //const prefix = '/'                                           
                                                               
  //setMainRoutes(mainComponent, injector, prefix)               
  await (new Shell()).run(context)
}
