// @flow
const { set } = require('lodash');
const { Patient } = require('./patient');

const SPECIAL_SYMPTOMS = ['isCough', 'isFever', 'isReddish'];
const MESSAGES = {
  error: {
    status: 'error',
    range: [70, 100],
    message: 'Alto indício de sarampo',
    description: 'O paciente está em um grupo com alto indício de sintomas de sarampo'
  },
  warning: {
    status: 'warning',
    range: [45, 69],
    message: 'Indício de sarampo',
    description: 'O paciente está em um grupo com indício de sintomas de sarampo'
  },
  success: {
    status: 'success',
    range: [0, 44],
    message: 'Baixo indício de sarampo',
    description: 'O paciente está em um grupo com baixo indício de sintomas de sarampo'
  }
};

const QUESTIONS = Object.freeze([
  {
    title: 'Manchas Avermelhadas',
    subtitle:
      'O paciente está apresentando, ou se queixando de manchas avermelhadas na pele (exantema maculopapular eritematoso), que começam no rosto e progridem em direção aos pés?',
    inputName: 'isReddish'
  },
  {
    title: 'Febre',
    subtitle: 'O paciente está apresentando, ou se queixando de febre?',
    inputName: 'isFever'
  },
  {
    title: 'Tosse',
    subtitle: 'O paciente está apresentando, ou se queixando de tosse?',
    inputName: 'isCough'
  },
  {
    title: 'Mal-estar',
    subtitle: 'O paciente está apresentando, ou se queixando de mal-estar?',
    inputName: 'isMalaise'
  },
  {
    title: 'Conjuntivite',
    subtitle: 'O paciente está apresentando, ou se queixando de conjuntivite?',
    inputName: 'isConjuctivitis'
  },
  {
    title: 'Coriza',
    subtitle: 'O paciente está apresentando, ou se queixando de coriza?',
    inputName: 'isCoryza'
  },
  {
    title: 'Perda do apetite',
    subtitle: 'O paciente está apresentando, ou se queixando de perda do apetite?',
    inputName: 'isLossAppetite'
  },
  {
    title: 'Manchas brancas',
    subtitle:
      'O paciente está apresentando, ou se queixando de manchas brancas na parte interna das bochechas (exantema de Koplik)?',
    inputName: 'isWhiteSpots'
  },
  {
    title: 'Diarreia',
    subtitle: 'O paciente está apresentando, ou se queixando de Diarreia?',
    inputName: 'isDiarrehea'
  },
  {
    title: 'Convulsões',
    subtitle: 'O paciente está apresentando, ou se queixando de Convulsões?',
    inputName: 'isConvulsion'
  },
  {
    title: 'Infecção no ouvido',
    subtitle: 'O paciente está apresentando, ou se queixando de Infecção no ouvido?',
    inputName: 'isEarInfection'
  }
]);

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
    this.measlesRate = this.calculateMeaslesRate();
  }

  calculateMeaslesRate() {
    const totalScore = QUESTIONS.map(({ inputName }) => {
      let score = 0;
      if (this[inputName]) {
        score = SPECIAL_SYMPTOMS.includes(inputName) ? 4.0 / 3.0 : 0.75;
      } else {
        score = 0.15;
      }
      return score;
    }).reduce((totalScore, score) => totalScore + score, 0);
    return Math.ceil((100.0 * totalScore) / 10.0) / 100;
  }

  calculateMeaslesScore() {
    const percentage = this.measlesRate * 100;
    const ranges = Object.keys(MESSAGES).reduce(
      (obj, curr) => set(obj, curr, MESSAGES[curr].range),
      {}
    );
    for (var [key, value] of Object.entries(ranges)) {
      const low = value[0];
      const high = value[1];
      if (percentage >= low && percentage <= high) {
        return MESSAGES[key];
      }
    }
    return null;
  }
}

module.exports = {
  Screening: Screening
};
