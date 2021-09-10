import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from './user.service';

export class UserController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  test = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await this.service.test();

    reply.send(result);
  }
}
