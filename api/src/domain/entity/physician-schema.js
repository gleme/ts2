const { EntitySchema } = require('typeorm');
const { Physician } = require('../model/physician');

module.exports = new EntitySchema({
    name: 'Physician',
    target: Physician,
    extends: 'Person',
    columns: {
        crm: {
            type: 'varchar',
            length: '15',
            unique: true
        }
    },
    relations: {
        specialties: {
            target: 'MedicalSpecialty',
            type: 'many-to-many',
            cascade: true,
            joinTable: {
                name: 'physician_specialty',
                joinColumn: {
                    name: 'physicianCpf',
                    referencedColumnName: 'cpf'
                }
            }
        }
    }
});
