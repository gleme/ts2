const { EntitySchema } = require('typeorm');
const { MedicalConsultation } = require('../model/medical-consultation');

module.exports = new EntitySchema({
    name: 'MedicalConsultation',
    target: MedicalConsultation,
    columns: {
        protocol: {
            primary: true,
            type: 'int',
            generated: true
        },
        date: {
            type: 'varchar',
            length: 127
        },
        prescription: {
            type: 'varchar',
            length: 255
        }
    },
    relations: {
        physician: {
            target: 'Physician',
            type: 'many-to-one'
        },
        patient: {
            target: 'Patient',
            type: 'many-to-one'
        },
        procedures: {
            target: 'MedicalProcedure',
            type: 'many-to-many',
            joinTable: {
                name: 'consultation_procedure'
            }
        }
    }
});
