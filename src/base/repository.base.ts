import { Collection, Db } from 'mongodb';

export abstract class BaseRepository {
  protected collection: Collection;

  constructor(
    db: Db,
    collectionName: string,
  ) {
    this.collection = db.collection(collectionName);
  }
}
