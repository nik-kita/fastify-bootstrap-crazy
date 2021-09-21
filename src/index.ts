/* eslint-disable global-require */
import EventEmitter from 'events';
import Fastify from 'fastify';
import { ObjectId } from 'mongodb';
import { allPluginsPlugin } from './plugins/all-plugins.plugin';
import * as jsonSchemaNamespace from './types/json-schema.namespace';

export const globalEmitter = new EventEmitter();

// eslint-disable-next-line no-unused-expressions
jsonSchemaNamespace;

const server = Fastify({
  logger: true,
  ajv: {
    customOptions: {
      $data: true,
      keywords: {
        objectId: {
          modifying: true,
          schema: false,
          validate(data: any) {
            return ObjectId.isValid(data);
          },
        },
      },
    },
  },
});

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await server.register(allPluginsPlugin);
    await server.listen(PORT, '0.0.0.0');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
