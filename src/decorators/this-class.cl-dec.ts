/* eslint-disable no-param-reassign */
export function ThisClass<T extends new(...args: any[]) => any>() {
  return (target: T) => class extends target {
    constructor(...args: any[]) {
      super(...args);
      const methods = Object.getOwnPropertyNames(target.prototype);
      methods.forEach((method) => {
        (this as any)[method] = (this as any)[method].bind(this);
      });
    }
  };
}
