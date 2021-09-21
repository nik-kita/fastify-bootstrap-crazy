import { BaseService } from '../../base/service.base';
import { UserRepository } from './user.repository';

export class UserService extends BaseService<UserRepository> {
  constructor(repository: UserRepository) {
    super(repository);
  }

  // TODO rm any
  async create(user: any) {
    return this.repository.create(user);
  }

  test() {
    return this.repository.test();
  }
}
