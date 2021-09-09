import { globalEmitter } from '../index';
import { WaitInitType } from '../types/wait-init.type';

class SingletonAsyncGetter {
  static async getInstance<T>(waitInitObject: WaitInitType<T>) {
    const { target, isReady, emitterLabel } = waitInitObject;

    if (isReady) {
      return Promise.resolve(target!);
    }

    return new Promise<T>((resolve) => {
      globalEmitter.on(emitterLabel, () => resolve(target!));
    });
  }
}

export const { getInstance } = SingletonAsyncGetter;
