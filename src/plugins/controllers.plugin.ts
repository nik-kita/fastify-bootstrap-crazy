import { FastifyInstance, RegisterOptions } from 'fastify';
import { BaseController } from '../base/controller.base';
import { COMPONENTS, CONTROLLERS } from '../components/components.map';
import { ClassType } from '../types/class-type';
import { InitType } from '../types/init-type';
import { classInstancesReady, getTarget } from '../utils/after-init-getter.util';
import { getServicesMap } from './services.plugin';

const controllersInitObj: InitType<ClassType<BaseController>[]> = {
  target: CONTROLLERS,
  isReady: false,
  emitterLabel: 'all controllers are ready',
};

class ControllersPlugin {
  static async controllersPlugin(
    server: FastifyInstance,
    options: RegisterOptions,
  ) {
    const servicesMap = await getServicesMap();
    const controllersMap = new Map(
      COMPONENTS.map(({ controller: ControllerClass, service }) => [
        ControllerClass.name,
        new ControllerClass(servicesMap.get(service.name)),
      ]),
    );

    classInstancesReady(controllersInitObj, controllersMap, server);
  }

  static async getControllersMap() {
    return getTarget<
      Map<string, BaseController>,
      ClassType<BaseController>[]
    >(controllersInitObj);
  }
}

export const {
  controllersPlugin,
} = ControllersPlugin;
