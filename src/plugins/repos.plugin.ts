import { FastifyInstance, RegisterOptions } from 'fastify';
import { InitType } from '../types/init-type';
import { getDb } from './mongo.plugin';

const reposInitObj: InitType<[]> = {
  target: null,
  isReady: false,
  emitterLabel: 'all repositories are ready',
};

class ReposPlugin {
  static async reposPlugin(
    server: FastifyInstance,
    options: RegisterOptions,
  ) {
    const db = await getDb();
  }
}

export const { reposPlugin } = ReposPlugin;
