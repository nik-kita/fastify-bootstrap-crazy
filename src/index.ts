import EventEmitter from 'events';
import Fastify from 'fastify';

export const globalEmitter = new EventEmitter();
const server = Fastify({ logger: true });
const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await server.listen(PORT, '0.0.0.0');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
