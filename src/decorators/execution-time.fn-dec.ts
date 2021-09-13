/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
export function ExecutionTime() {
  return (target: Object, key: string, descriptor: PropertyDescriptor) => {
    const { value: origin } = descriptor;
    const label = `${target.constructor.name}.${key}()`;

    descriptor.value = (...args: any[]) => {
      console.time(label);

      const result = origin.apply(target.constructor.prototype, args);

      if (result instanceof Promise) {
        return result.finally(() => console.timeEnd(label));
      }

      console.timeEnd(label);

      return result;
    };

    return descriptor;
  };
}
