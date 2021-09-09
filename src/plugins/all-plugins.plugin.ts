import { FastifyInstance, RegisterOptions } from 'fastify';
import { mongoPlugin } from './mongo.plugin';

class AllPluginsPlugin {
  static async allPluginsPlugin(
    server: FastifyInstance,
    options: RegisterOptions,
  ) {
    await server.register(mongoPlugin);
  }
}

export const { allPluginsPlugin } = AllPluginsPlugin;
