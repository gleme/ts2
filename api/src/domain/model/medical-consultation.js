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
    physician: Physician,
    procedures: MedicalProcedure[],
    diagnosis: MedicalDiagnosis[]
  ) {
    this.date = date;
    this.prescription = prescription;
    this.patient = patient;
    this.physician = physician;
    this.procedures = procedures;
    this.diagnosis = diagnosis;
  }

  static toMessage(consultation: MedicalConsultation) {
    const { protocol, date, prescription, createdAt, updatedAt, patient, physician } = consultation;
    return JSON.stringify({
      type: 'medicalconsultation',
      cns_protocol: protocol,
      cns_date: date,
      cns_comments: prescription,
      cns_createdAt: createdAt,
      cns_updatedAt: updatedAt,
      cns_pat_cpf: patient.cpf,
      cns_phy_cpf: physician.cpf
    });
  }
}

module.exports = {
  MedicalConsultation: MedicalConsultation
};
