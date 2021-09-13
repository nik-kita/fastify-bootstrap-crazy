import { FastifyInstance, RegisterOptions } from 'fastify';
import { Db, MongoClient } from 'mongodb';
import { ExecutionTime } from '../decorators/execution-time.fn-dec';
import { InitType } from '../types/init-type';
import { getTarget, targetReady } from '../utils/after-init-getter.util';

const MONGO_URI = process.env.MOGO_URI || 'mongodb+srv://tester:Password1!@test-preview.3xrjv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const DB_NAME = process.env.DB_NAMW || 'test-preview';
const dbInitObj: InitType = {
  target: null,
  isReady: false,
  emitterLabel: 'connect to mongo',
};

class MongoPlugin {
  static async mongoPlugin(
    server: FastifyInstance,
    options: RegisterOptions,
  ) {
    const connection = await MongoClient.connect(MONGO_URI);

    targetReady(
      dbInitObj,
      connection.db(DB_NAME),
      server,
    );
  }

  static async getDb() {
    return getTarget<Db>(dbInitObj);
  }
}

export const { mongoPlugin, getDb } = MongoPlugin;
