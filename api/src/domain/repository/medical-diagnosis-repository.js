const { MongoRepository } = require('./mongo-repository');
const { MedicalDiagnosis } = require('../model/medical-diagnosis');

class MedicalDiagnosisRepository extends MongoRepository {
  constructor(db) {
    super(db, 'diagnosis');
  }

  async findByCode(code) {
    try {
      const doc = await this.collection.findOne({ code });
      const diagnosis = new MedicalDiagnosis(doc.code, doc.description, doc.category, doc.symptoms);
      diagnosis.info = doc.info;
      return diagnosis;
    } catch (error) {
      throw error;
    }
  }

  async findByDisease(disease) {
    try {
      const docs = await this.collection
        .find({ 'category.description': new RegExp(`.*${disease}.*`, 'i') })
        .toArray();
      return docs.map(
        doc => new MedicalDiagnosis(doc.code, doc.description, doc.category, doc.symptoms)
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  MedicalDiagnosisRepository
};
