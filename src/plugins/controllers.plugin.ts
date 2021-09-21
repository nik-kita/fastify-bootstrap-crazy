import { FastifyInstance, RegisterOptions } from 'fastify';
import { COMPONENTS, CONTROLLERS } from '../components/components.map';
import { ClassType } from '../types/class-type.type';
import { InitType } from '../types/init-type.type';
import { classInstancesReady, getTarget } from '../utils/after-init-getter.util';
import { getServicesMap } from './services.plugin';

const controllersInitObj: InitType<ClassType<any>[]> = {
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
    const controllersMap = new WeakMap(
      COMPONENTS.map(({ controller: ControllerClass, service }) => [
        ControllerClass,
        new ControllerClass(servicesMap.get(service)),
      ]),
    );

    classInstancesReady(controllersInitObj, controllersMap, server);
  }

  static async getControllersMap() {
    return getTarget<
      WeakMap<ClassType<any>, any>,
      ClassType<any>[]
    >(controllersInitObj);
  }
}

export const {
  controllersPlugin,
  getControllersMap,
} = ControllersPlugin;
