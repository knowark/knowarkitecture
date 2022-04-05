export class SessionProxy {
  constructor() {
  }

  proxy(method) {
    return async (entry) => {
      entry.meta.proxy = true
      return await method(entry)
    }
  }
}
