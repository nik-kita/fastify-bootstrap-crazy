import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from './user.service';

export class UserController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  test(request: FastifyRequest, reply: FastifyReply) {
    return this.service.test();
  }
}
