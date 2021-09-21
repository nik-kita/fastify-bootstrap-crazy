import { FastifyReply, FastifyRequest } from 'fastify';
import { ThisClass } from '../../decorators/this-class.cl-dec';
import { UserService } from './user.service';

@ThisClass()
export class UserController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { body: user } = request;

    const createdUser = await this.service.create(user);

    reply.send(createdUser);
  }

  async test(request: FastifyRequest, reply: FastifyReply) {
    const result = await this.service.test();

    reply.send(result);
  }
}
