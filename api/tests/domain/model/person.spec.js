const { expect } = require('chai');
const { Person } = require('../../../src/domain/model/person');

describe('Person', () => {
    context('smoke tests', () => {
        it('should exist Person constructor', () => {
            expect(Person).to.be.a('function');
        });
    });
    context('Valid data', () => {
        describe('contructor', () => {
            it('should create a new instance of a person', () => {
                const person = new Person(
                    1234,
                    'Jorge da Silva',
                    new Date(),
                    'M',
                    'Endereco desconhecido',
                    1332321
                );
                expect(person).to.be.an.instanceOf(Person);
            });
        });
    });
});
