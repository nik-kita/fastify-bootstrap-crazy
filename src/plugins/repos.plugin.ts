import { FastifyInstance, RegisterOptions } from 'fastify';
import { BaseRepository } from '../base/repository.base';
import { REPOSITORIES } from '../components/components.map';
import { UserRepository } from '../components/user/user.repository';
import { ClassType } from '../types/class-type.type';
import { InitType } from '../types/init-type.type';
import { classInstancesReady, getTarget } from '../utils/after-init-getter.util';
import { getDb } from './mongo.plugin';

const reposInitObj: InitType<ClassType<BaseRepository>[]> = {
  target: REPOSITORIES,
  isReady: false,
  emitterLabel: 'all repositories are ready',
};

class ReposPlugin {
  static async reposPlugin(
    server: FastifyInstance,
    options: RegisterOptions,
  ) {
    const db = await getDb();
    const reposMap = new WeakMap(
      REPOSITORIES.map((RepositoryClass) => [RepositoryClass, new RepositoryClass(db)]),
    );

    classInstancesReady(reposInitObj, reposMap, server);
  }

  static async getReposMap() {
    return getTarget<
      WeakMap<ClassType<BaseRepository>, any>,
      ClassType<BaseRepository>[]
    >(reposInitObj);
  }
}

export const {
  reposPlugin,
  getReposMap,
} = ReposPlugin;
