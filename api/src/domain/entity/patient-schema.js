const { EntitySchema } = require('typeorm');
const { Patient } = require('../model/patient');

module.exports = new EntitySchema({
    name: 'Patient',
    target: Patient,
    extends: 'Person',
    columns: {
        email: {
            type: 'varchar',
            length: 63
        }
    },
    relations: {
        consultations: {
            target: 'MedicalConsultation',
            type: 'one-to-many'
        }
    }
});
