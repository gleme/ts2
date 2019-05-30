import { set } from 'lodash';
const SPECIAL_SYMPTOMS = ['tosse', 'febre', 'manchas-avermelhadas'];

const MESSAGES = {
  error: {
    label: 'error',
    range: [70, 100],
    message: 'Alto indício de sarampo',
    description: 'O paciente está em um grupo com alto indício de sintomas de sarampo'
  },
  warning: {
    label: 'warning',
    range: [45, 69],
    message: 'Indício de sarampo',
    description: 'O paciente está em um grupo com indício de sintomas de sarampo'
  },
  success: {
    label: 'success',
    range: [0, 44],
    message: 'Baixo indício de sarampo',
    description: 'O paciente está em um grupo com baixo indício de sintomas de sarampo'
  }
};

export function calculateIndicator(questions) {
  const totalScore = questions
    .map(question => calculateQuestionScore(question))
    .reduce((total, score) => total + score, 0);

  const percentage = Math.ceil((100.0 * totalScore) / 10.0);
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

export function calculateQuestionScore(question) {
  let score = 0;

  if (question.checked) {
    score = SPECIAL_SYMPTOMS.includes(question.inputName) ? 4.0 / 3.0 : 0.75;
  } else {
    score = 0.15;
  }

  return score;
}
