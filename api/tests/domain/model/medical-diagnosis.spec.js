const { expect } = require('chai');
const { MedicalDiagnosis, Category } = require('../../../src/domain/model/medical-diagnosis');

describe('MedicalDiagnosis', () => {
  describe('smoke tests', () => {
    it('should exist MedicalDiagnosis constructor', () => {
      expect(MedicalDiagnosis).to.be.a('function');
    });
  });
  context('Valid data', () => {
    let symptoms = null;
    let category = null;
    beforeEach(() => {
      symptoms = ['erupções de pele', 'diarreia', 'febre alta', 'tosse persistente'];
      category = new Category('B050', 'Sarampo');
    });

    describe('contructor', () => {
      it('should create a new instance of a MedicalDiagnosis', () => {
        const diagnosis = new MedicalDiagnosis(
          'B051',
          'Sarampo complicado por meningite',
          category,
          symptoms
        );
        expect(diagnosis).to.be.an.instanceOf(MedicalDiagnosis);
      });
    });
  });
});
