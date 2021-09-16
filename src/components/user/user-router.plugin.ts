import { FastifyInstance, RegisterOptions } from 'fastify';
import { getControllersMap } from '../../plugins/controllers.plugin';
import { UserController } from './user.controller';

class UserRouterPlugin {
  static async userRouterPlugin(
    server: FastifyInstance,
    options: RegisterOptions,
  ) {
    const controllersMap = await getControllersMap();
    const Controller = controllersMap.get(UserController) as UserController;

    server.route({
      method: 'GET',
      url: '/',
      handler: Controller.test,
    });
  }
}

export const {
  userRouterPlugin,
} = UserRouterPlugin;
