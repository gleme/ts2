const { expect } = require('chai');
const { Physician } = require('../../../src/domain/model/physician');
const { MedicalSpecialty } = require('../../../src/domain/model/medical-specialty');

describe('Physician', () => {
    describe('smoke tests', () => {
        it('should exist Physician constructor', () => {
            expect(Physician).to.be.a('function');
        });
    });
    describe('contructor', () => {
        // it('should create')
        it('should create a new instance of a physician', () => {
            const specialties = [
                new MedicalSpecialty('Pediatria'),
                new MedicalSpecialty('Ortopedia'),
                new MedicalSpecialty('Psiquiatria')
            ];
            const physician = new Physician(
                1234,
                'Jorge da Silva',
                new Date(),
                'M',
                'Endereco desconhecido',
                1332321,
                '1321-SP',
                specialties
            );

            expect(physician).to.be.an.instanceOf(Physician);
        });
    });
});
