import { FastifyInstance, RegisterOptions } from 'fastify';
import { Db, MongoClient } from 'mongodb';
import { InitType } from '../types/init-type';
import { getTarget, targetReady } from '../utils/after-init-getter.util';

const MONGO_URI = process.env.MOGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAMW || 'mem';
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
    const result = await getTarget<Db>(dbInitObj);

    return result;
  }
}

export const { mongoPlugin, getDb } = MongoPlugin;
