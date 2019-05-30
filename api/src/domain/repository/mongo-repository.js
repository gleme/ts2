class MongoRepository {
  constructor(db, collectionName) {
    this.db = db;
    this.collection = db.collection(collectionName);
  }
}

module.exports = {
  MongoRepository
};
