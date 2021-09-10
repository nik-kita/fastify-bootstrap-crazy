import { FastifyInstance, RegisterOptions } from 'fastify';
import { getControllersMap } from '../../plugins/controllers.plugin';
import { UserController } from './user.controller';

class UserRouterPlugin {
  static async userRouterPlugin(
    server: FastifyInstance,
    options: RegisterOptions,
  ) {
    const Controller = (await getControllersMap()).get(UserController.name) as UserController;

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
