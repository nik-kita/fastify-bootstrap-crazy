import { FastifyInstance, RegisterOptions } from 'fastify';
import { BaseRepository } from '../base/repository.base';
import { UserRepository } from '../components/user/user.repository';
import { ClassType } from '../types/class-type';
import { InitType } from '../types/init-type';
import { getDb } from './mongo.plugin';

const reposInitObj: InitType<ClassType<BaseRepository>[]> = {
  target: [
    UserRepository,
  ],
  isReady: false,
  emitterLabel: 'all repositories are ready',
};

class ReposPlugin {
  static async reposPlugin(
    server: FastifyInstance,
    options: RegisterOptions,
  ) {
    const db = await getDb();

    reposInitObj.target.forEach((RepositoryClass) => new RepositoryClass(db));
  }
}

export const { reposPlugin } = ReposPlugin;
