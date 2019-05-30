const { EntitySchema } = require('typeorm');
const { Person } = require('../model/person');

module.exports = new EntitySchema({
    name: 'Person',
    target: Person,
    columns: {
        cpf: {
            primary: true,
            type: 'bigint',
            width: 11
        },
        name: {
            type: 'varchar',
            length: 127
        },
        address: {
            type: 'varchar',
            length: 255
        },
        birthDate: {
            type: 'date'
        },
        gender: {
            type: 'enum',
            enum: ['M', 'F', 'N/A']
        },
        phone: {
            type: 'int',
            width: 15
        },
        createdAt: {
            type: 'timestamp',
            createDate: true
        },
        updatedAt: {
            type: 'timestamp',
            updateDate: true
        }
    }
});
