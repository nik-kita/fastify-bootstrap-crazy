import { BaseService } from '../../base/service.base';
import { UserRepository } from './user.repository';

export class UserService extends BaseService<UserRepository> {
  constructor(repository: UserRepository) {
    super(repository);
  }

  test() {
    return this.repository.test();
  }
}
