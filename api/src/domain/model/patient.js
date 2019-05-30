// @flow
import type { Gender } from './person';
const { Person } = require('./person');
const { MedicalConsultation } = require('./medical-consultation');

class Patient extends Person {
    email: string;
    consultations: MedicalConsultation[];

    constructor(
        cpf: number,
        name: string,
        birthDate: Date,
        gender: Gender,
        address: string,
        phone: number,
        email: string
    ) {
        super(cpf, name, birthDate, gender, address, phone);
        this.email = email;
    }
}

module.exports = {
    Patient: Patient
};
