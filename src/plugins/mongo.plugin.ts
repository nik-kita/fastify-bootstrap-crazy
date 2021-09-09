import { FastifyInstance, RegisterOptions } from 'fastify';
import { Db, MongoClient } from 'mongodb';
import { globalEmitter } from '..';
import { WaitInitType } from '../types/wait-init.type';
import { getInstance, instanceReady } from '../utils/singleton-async-getter.util';

const MONGO_URI = process.env.MOGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAMW || 'mem';
const dbWaitInitObj: WaitInitType<Db> = {
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

    instanceReady(
      dbWaitInitObj,
      connection.db(DB_NAME),
      server,
    );
  }

  static async getDb() {
    const result = await getInstance<Db>(dbWaitInitObj);

    return result;
  }
}

export const { mongoPlugin } = MongoPlugin;
