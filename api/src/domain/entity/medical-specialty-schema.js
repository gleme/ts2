const { EntitySchema } = require('typeorm');
const { MedicalSpecialty } = require('../model/medical-specialty');

module.exports = new EntitySchema({
    name: 'MedicalSpecialty',
    target: MedicalSpecialty,
    columns: {
        code: {
            type: 'int',
            primary: true,
            generated: true
        },
        name: {
            type: 'varchar',
            length: 127,
            unique: true
        }
    }
});
