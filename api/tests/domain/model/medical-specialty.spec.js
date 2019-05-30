const { expect } = require('chai');
const { MedicalSpecialty } = require('../../../src/domain/model/medical-specialty');

describe('MedicalSpecialty', () => {
    describe('smoke tests', () => {
        it('should exist MedicalSpecialty constructor', () => {
            expect(MedicalSpecialty).to.be.a('function');
        });
    });
    context('Valid data', () => {
        describe('contructor', () => {
            it('should create a new instance of a MedicalSpecialty', () => {
                const specialty = new MedicalSpecialty('Ortopedia');
                expect(specialty).to.be.an.instanceOf(MedicalSpecialty);
            });
        });
    });
});
