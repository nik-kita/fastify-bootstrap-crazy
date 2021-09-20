import { BaseRepository } from './repository.base';

export abstract class BaseService<R extends BaseRepository> {
  protected repository: R;

  constructor(repository: R) {
    this.repository = repository;
  }
}
