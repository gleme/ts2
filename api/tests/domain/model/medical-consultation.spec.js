const { expect } = require('chai');
const { MedicalConsultation } = require('../../../src/domain/model/medical-consultation');
const { MedicalProcedure } = require('../../../src/domain/model/medical-procedure');
const { MedicalSpecialty } = require('../../../src/domain/model/medical-specialty');
const { Physician } = require('../../../src/domain/model/physician');
const { Patient } = require('../../../src/domain/model/patient');

describe('MedicalConsultation', () => {
    describe('smoke tests', () => {
        it('should exist MedicalConsultation constructor', () => {
            expect(MedicalConsultation).to.be.a('function');
        });
    });
    context('Valid data', () => {
        let patient = null;
        let physician = null;
        let procedures = null;
        beforeEach(() => {
            physician = new Physician(
                1234,
                'Jorge da Silva',
                new Date(),
                'M',
                'Endereco desconhecido',
                1332321,
                '1321-SP',
                [new MedicalSpecialty('Obstetra')]
            );
            patient = patient = new Patient(
                1234,
                'Jorge da Silva',
                new Date(),
                'M',
                'Endereco desconhecido',
                1332321,
                'email@domain.com'
            );
            procedures = [
                new MedicalProcedure('Em pronto socorro'),
                new MedicalProcedure('Visita ou consulta hospitalar do médico assistente')
            ];
        });

        describe('contructor', () => {
            it('should create a new instance of a MedicalConsultation', () => {
                const consultation = new MedicalConsultation(
                    new Date(),
                    'Tomar duas doses diarias de remedios',
                    patient,
                    physician
                );
                expect(consultation).to.be.an.instanceOf(MedicalConsultation);
            });
        });
    });
});
