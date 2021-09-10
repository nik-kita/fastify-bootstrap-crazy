import { FastifyInstance, RegisterOptions } from 'fastify';
import { BaseService } from '../base/service.base';
import { COMPONENTS, SERVICES } from '../components/components.map';
import { ClassType } from '../types/class-type';
import { InitType } from '../types/init-type';
import { classInstancesReady, getTarget } from '../utils/after-init-getter.util';
import { getReposMap } from './repos.plugin';

const servicesInitObj: InitType<ClassType<BaseService>[]> = {
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
      COMPONENTS.map(({ service: ClassService, repository }) => [
        ClassService.name,
        new ClassService(reposMap.get(repository.name)),
      ]),
    );

    classInstancesReady(servicesInitObj, servicesMap, server);
  }

  static async getServicesMap() {
    return getTarget<
      Map<string, BaseService>,
      ClassType<BaseService>[]
    >(servicesInitObj);
  }
}

export const {
  servicesPlugin,
} = ServicesPlugin;
