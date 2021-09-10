import { FastifyInstance } from 'fastify';
import { globalEmitter } from '../index';
import { ClassType } from '../types/class-type';
import { InitType } from '../types/init-type';

class AfterInitGetter {
  static async getTarget<T, U = null>(initObj: InitType<U>) {
    const { target, isReady, emitterLabel } = initObj;

    if (isReady) {
      return Promise.resolve(target as unknown as T);
    }

    return new Promise<T>((resolve) => {
      globalEmitter.on(emitterLabel, () => resolve(target as unknown as T));
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

  static classInstancesReady<T extends ClassType<any>>(
    initObj: InitType<T[]>,
    resolvedTarget: Map<string, InstanceType<T>>,
    server?: FastifyInstance,
  ) {
    const { emitterLabel } = initObj;

    // eslint-disable-next-line no-param-reassign
    (initObj.target as unknown) = resolvedTarget;
    // eslint-disable-next-line no-param-reassign
    initObj.isReady = true;
    globalEmitter.emit(emitterLabel);

    if (server) server.log.info(emitterLabel);
  }
}

export const {
  getTarget,
  targetReady,
  classInstancesReady,
} = AfterInitGetter;
