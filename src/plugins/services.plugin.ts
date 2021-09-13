import { FastifyInstance, RegisterOptions } from 'fastify';
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
    const servicesMap = new Map(
      COMPONENTS.map(({ service: ServiceClass, repository }) => [
        ServiceClass.name,
        new ServiceClass(reposMap.get(repository.name)),
      ]),
    );

    classInstancesReady(servicesInitObj, servicesMap, server);
  }

  static async getServicesMap() {
    return getTarget<
      Map<string, any>,
      ClassType<any>[]
    >(servicesInitObj);
  }
}

export const {
  servicesPlugin,
  getServicesMap,
} = ServicesPlugin;
