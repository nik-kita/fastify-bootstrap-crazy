import { FastifyInstance, RegisterOptions } from 'fastify';
import { controllersPlugin } from './controllers.plugin';
import { mongoPlugin } from './mongo.plugin';
import { reposPlugin } from './repos.plugin';
import { routersPlugin } from './routers.plugin';
import { servicesPlugin } from './services.plugin';

class AllPluginsPlugin {
  static async allPluginsPlugin(
    server: FastifyInstance,
    options: RegisterOptions,
  ) {
    await server.register(mongoPlugin);
    await server.register(reposPlugin);
    await server.register(servicesPlugin);
    await server.register(controllersPlugin);
    await server.register(routersPlugin);
  }
}

export const { allPluginsPlugin } = AllPluginsPlugin;
