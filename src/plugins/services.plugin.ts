import { FastifyInstance, RegisterOptions } from 'fastify';

class ServicesPlugin {
  static async servicesPlugin(
    server: FastifyInstance,
    options: RegisterOptions,
  ) {
    return null; // TODO
  }
}

export const {
  servicesPlugin,
} = ServicesPlugin;
