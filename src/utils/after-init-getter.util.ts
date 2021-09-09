import { FastifyInstance } from 'fastify';
import { globalEmitter } from '../index';
import { InitType } from '../types/init-type';

class AfterInitGetter {
  static async getTarget<T>(initObj: InitType<T>) {
    const { target, isReady, emitterLabel } = initObj;

    if (isReady) {
      return Promise.resolve(target!);
    }

    return new Promise<T>((resolve) => {
      globalEmitter.on(emitterLabel, () => resolve(target!));
    });
  }

  static targetReady<T>(
    initObj: InitType<T>,
    resolvedTarget: T,
    server?: FastifyInstance,
  ) {
    const { emitterLabel } = initObj;
    // eslint-disable-next-line no-param-reassign
    initObj.target = resolvedTarget;
    // eslint-disable-next-line no-param-reassign
    initObj.isReady = true;
    globalEmitter.emit(emitterLabel);

    if (server) server.log.info(emitterLabel);
  }
}

export const {
  getTarget,
  targetReady,
} = AfterInitGetter;
