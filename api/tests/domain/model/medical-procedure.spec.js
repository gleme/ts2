const { expect } = require('chai');
const { MedicalProcedure } = require('../../../src/domain/model/medical-procedure');

describe('MedicalProcedure', () => {
    describe('smoke tests', () => {
        it('should exist MedicalProcedure constructor', () => {
            expect(MedicalProcedure).to.be.a('function');
        });
    });
    context('Valid data', () => {
        describe('contructor', () => {
            it('should create a new instance of a MedicalProcedure', () => {
                const procedure = new MedicalProcedure('Em pronto socorro');
                expect(procedure).to.be.an.instanceOf(MedicalProcedure);
            });
        });
    });
});
