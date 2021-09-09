import { FastifyInstance } from 'fastify';
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

  static instanceReady<T>(
    waitInitObject: WaitInitType<T>,
    resolvedTarget: T,
    server?: FastifyInstance,
  ) {
    const { emitterLabel } = waitInitObject;
    // eslint-disable-next-line no-param-reassign
    waitInitObject.target = resolvedTarget;
    // eslint-disable-next-line no-param-reassign
    waitInitObject.isReady = true;
    globalEmitter.emit(emitterLabel);

    if (server) server.log.info(emitterLabel);
  }
}

export const {
  getInstance,
  instanceReady,
} = SingletonAsyncGetter;
