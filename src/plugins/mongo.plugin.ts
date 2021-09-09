import { FastifyInstance, RegisterOptions } from 'fastify';
import { Db, MongoClient } from 'mongodb';
import { globalEmitter } from '..';
import { WaitInitType } from '../types/wait-init.type';
import { getInstance } from '../utils/singleton-async-getter.util';

const MONGO_URI = process.env.MOGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAMW || 'mem';
const dbWaitInitObj: WaitInitType<Db> = {
  target: null,
  isReady: false,
  emitterLabel: 'connect to mongo',
};

class MongoPlugin {
  static async connectToMongo(
    server: FastifyInstance,
    options: RegisterOptions,
  ) {
    const connection = await MongoClient.connect(MONGO_URI);
    let { target: db, isReady } = dbWaitInitObj;
    const { emitterLabel } = dbWaitInitObj;

    db = connection.db(DB_NAME);
    isReady = true;
    globalEmitter.emit(emitterLabel);
  }

  static async getDb() {
    const result = await getInstance<Db>(dbWaitInitObj);

    return result;
  }
}

export const { connectToMongo } = MongoPlugin;
