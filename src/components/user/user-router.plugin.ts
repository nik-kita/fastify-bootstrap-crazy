import { FastifyInstance, RegisterOptions } from 'fastify';
import { getControllersMap } from '../../plugins/controllers.plugin';
import { UserSchema, USER_SCHEMA_REF } from './shemas/user.schema';
import { UserController } from './user.controller';

class UserRouterPlugin {
  static async userRouterPlugin(
    server: FastifyInstance,
    options: RegisterOptions,
  ) {
    const controllersMap = await getControllersMap();
    const Controller = controllersMap.get(UserController) as UserController;

    server.addSchema(UserSchema);

    server.route({
      method: 'POST',
      url: '/',
      schema: {
        body: {
          $ref: USER_SCHEMA_REF,
        },
      },
      handler: Controller.create,
    });

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
