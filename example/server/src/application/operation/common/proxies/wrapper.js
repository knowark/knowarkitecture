export class Wrapper {
  constructor(proxies) {
    this.proxies = proxies
  }

  wrap(operator) {
    const stack = this.proxies.map(item => item.proxy.bind(item)).reverse()

    return new Proxy(operator, {
      get(target, property) {
        const method = target[property]
        if (typeof method !== 'function' || property === 'constructor') {
          return method
        }

        return stack.reduce((previous, current) => {
          return current(previous)
        }, method.bind(target))
      }
    })
  }
}
