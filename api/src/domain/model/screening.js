// @flow
const { Patient } = require('./patient');

class Screening {
  id: number;
  patient: Patient;
  date: Date;
  isReddish: boolean;
  isFever: boolean;
  isCough: boolean;
  isMalaise: boolean;
  isConjuctivitis: boolean;
  isCoryza: boolean;
  isLossAppetite: boolean;
  isWhiteSpots: boolean;
  isDiarrehea: boolean;
  isConvulsion: boolean;
  isEarInfection: boolean;
  measlesRate: number;

  constructor(
    patient: Patient,
    date: Date,
    isReddish: boolean,
    isFever: boolean,
    isCough: boolean,
    isMalaise: boolean,
    isConjuctivitis: boolean,
    isCoryza: boolean,
    isLossAppetite: boolean,
    isWhiteSpots: boolean,
    isDiarrehea: boolean,
    isConvulsion: boolean,
    isEarInfection: boolean
  ) {
    this.patient = patient;
    this.date = date;
    this.isReddish = isReddish;
    this.isFever = isFever;
    this.isCough = isCough;
    this.isMalaise = isMalaise;
    this.isConjuctivitis = isConjuctivitis;
    this.isCoryza = isCoryza;
    this.isLossAppetite = isLossAppetite;
    this.isWhiteSpots = isWhiteSpots;
    this.isDiarrehea = isDiarrehea;
    this.isConvulsion = isConvulsion;
    this.isEarInfection = isEarInfection;
  }
}

module.exports = {
  Screening: Screening
};
