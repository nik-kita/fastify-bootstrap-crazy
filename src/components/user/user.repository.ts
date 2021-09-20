import { Collection, Db } from 'mongodb';
import { BaseRepository } from '../../base/repository.base';

export class UserRepository extends BaseRepository {
  constructor(
    db: Db,
  ) {
    super(db, 'users');
  }

  test() {
    return this.collection.findOne();
  }
}
