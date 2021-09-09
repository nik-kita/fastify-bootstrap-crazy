import { globalEmitter } from '../index';

class SingletonAsyncGetter {
  static async getInstance<T>(
    isReady: boolean,
    emitterLabel: string,
    target: T | null,
  ) {
    if (isReady) {
      return Promise.resolve(target!);
    }

    return new Promise<T>((resolve) => {
      globalEmitter.on(emitterLabel, () => resolve(target!));
    });
  }
}

export const { getInstance } = SingletonAsyncGetter;
