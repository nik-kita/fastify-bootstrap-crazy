import { FastifyInstance, RegisterOptions } from 'fastify';
import { userRouterPlugin } from '../components/user/user-router.plugin';
import { RouterPluginInterface } from '../interfaces/router-plugin.interface';

const ROUTERS_MAP: [[string, RouterPluginInterface]] = [
  ['/users', userRouterPlugin],
];

class RoutersPlugin {
  static async routersPlugin(
    server: FastifyInstance,
    options: RegisterOptions,
  ) {
    ROUTERS_MAP.forEach(([path, routerPlugin]) => server.register(routerPlugin, { prefix: path }));
  }
}

export const {
  routersPlugin,
} = RoutersPlugin;
