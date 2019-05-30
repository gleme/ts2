// @flow
const { Physician } = require('./physician');
const { Patient } = require('./patient');
const { MedicalProcedure } = require('./medical-procedure');
const { MedicalDiagnosis } = require('./medical-diagnosis');

class MedicalConsultation {
  protocol: number;
  date: Date;
  prescription: string;
  patient: Patient;
  physician: Physician;
  procedures: MedicalProcedure[];
  diagnosis: MedicalDiagnosis[];

  constructor(
    date: Date,
    prescription: string,
    patient: Patient,
    physician: Physician
  ) {
    this.date = date;
    this.prescription = prescription;
    this.patient = patient;
    this.physician = physician;
  }
}

module.exports = {
  MedicalConsultation: MedicalConsultation
};
