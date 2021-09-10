import { Collection, Db } from 'mongodb';

export class UserRepository {
  protected collection: Collection;

  constructor(
    db: Db,
  ) {
    this.collection = db.collection('users');
  }

  test() {
    return this.collection.findOne();
  }
}
