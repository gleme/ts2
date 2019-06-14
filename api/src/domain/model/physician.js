// @flow
import type { Gender } from './person';
const { Person } = require('./person');
const { MedicalSpecialty } = require('./medical-specialty');

class Physician extends Person {
  crm: string;
  specialties: MedicalSpecialty[];

  constructor(
    cpf: number,
    name: string,
    birthDate: Date,
    gender: Gender,
    phone: number,
    address: string,
    crm: string,
    specialties: MedicalSpecialty[]
  ) {
    super(cpf, name, birthDate, gender, address, phone);
    this.crm = crm;
    this.specialties = specialties;
  }

  static toMessage(physician) {
    const { cpf, name, gender, phone, crm, specialties, address } = physician;
    return JSON.stringify({
      type: 'physician',
      phy_cpf: cpf,
      phy_name: name,
      phy_gender: gender,
      phy_phone_pro: phone,
      phy_address: address,
      phy_crm: crm,
      specialties: specialties
    });
  }
}

module.exports = {
  Physician: Physician
};
