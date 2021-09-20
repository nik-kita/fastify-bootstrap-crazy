import { FastifyInstance, RegisterOptions } from 'fastify';
import { BaseService } from '../base/service.base';
import { COMPONENTS, SERVICES } from '../components/components.map';
import { ClassType } from '../types/class-type';
import { InitType } from '../types/init-type';
import { classInstancesReady, getTarget } from '../utils/after-init-getter.util';
import { getReposMap } from './repos.plugin';

const servicesInitObj: InitType<ClassType<any>[]> = {
  target: SERVICES,
  isReady: false,
  emitterLabel: 'all single-component services are ready',
};
class ServicesPlugin {
  static async servicesPlugin(
    server: FastifyInstance,
    options: RegisterOptions,
  ) {
    const reposMap = await getReposMap();
    const servicesMap = new WeakMap(
      COMPONENTS.map(({ service: ServiceClass, repository }) => [
        ServiceClass,
        new ServiceClass(reposMap.get(repository)),
      ]),
    );

    classInstancesReady(servicesInitObj, servicesMap, server);
  }

  static async getServicesMap() {
    return getTarget<
      WeakMap<ClassType<BaseService<any>>, any>,
      ClassType<BaseService<any>>[]
    >(servicesInitObj);
  }
}

export const {
  servicesPlugin,
  getServicesMap,
} = ServicesPlugin;
