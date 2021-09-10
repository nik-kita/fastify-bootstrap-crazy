import { UserRepository } from './user.repository';

export class UserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  test() {
    return this.repository.test();
  }
}
