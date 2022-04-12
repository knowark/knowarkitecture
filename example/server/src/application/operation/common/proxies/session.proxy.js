export class SessionProxy {
  constructor({ contextor }) {
    this.contextor = contextor
  }

  proxy(
    //target, 
    method) {

    //target  
    
    return async (entry) => {
      const context = {
        tid: entry.meta?.authorization?.tid || 'default',
        uid: entry.meta?.authorization?.uid || 'default',
      }

      entry.meta.proxy = true
      return this.contextor.run(
        context, async () =>  method(entry))
    }
  }
}
