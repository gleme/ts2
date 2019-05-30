const { EntitySchema } = require('typeorm');
const { MedicalProcedure } = require('../model/medical-procedure');

module.exports = new EntitySchema({
    name: 'MedicalProcedure',
    target: MedicalProcedure,
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
