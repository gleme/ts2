const { expect } = require('chai');
const { Patient } = require('../../../src/domain/model/patient');

describe('Patient', () => {
    describe('smoke tests', () => {
        it('should exist Patient constructor', () => {
            expect(Patient).to.be.a('function');
        });
    });
    context('Valid data', () => {
        describe('contructor', () => {
            it('should create a new instance of a Patient', () => {
                const patient = new Patient(
                    1234,
                    'Jorge da Silva',
                    new Date(),
                    'M',
                    'Endereco desconhecido',
                    1332321,
                    'email@domain.com'
                );

                expect(patient).to.be.an.instanceOf(Patient);
            });
        });
    });
});
