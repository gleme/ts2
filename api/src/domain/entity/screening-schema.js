const { EntitySchema } = require('typeorm');
const { Screening } = require('../model/screening');

module.exports = new EntitySchema({
  name: 'Screening',
  target: Screening,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    date: {
      type: 'date'
    },
    measlesRate: {
      type: 'double',
      nullable: true
    },
    isReddish: {
      type: 'tinyint',
      precision: 1
    },
    isFever: {
      type: 'tinyint',
      precision: 1
    },
    isCough: {
      type: 'tinyint',
      precision: 1
    },
    isMalaise: {
      type: 'tinyint',
      precision: 1
    },
    isConjuctivitis: {
      type: 'tinyint',
      precision: 1
    },
    isCoryza: {
      type: 'tinyint',
      precision: 1
    },
    isLossAppetite: {
      type: 'tinyint',
      precision: 1
    },
    isWhiteSpots: {
      type: 'tinyint',
      precision: 1
    },
    isDiarrehea: {
      type: 'tinyint',
      precision: 1
    },
    isConvulsion: {
      type: 'tinyint',
      precision: 1
    },
    isEarInfection: {
      type: 'tinyint',
      precision: 1
    }
  },
  relations: {
    patient: {
      target: 'Patient',
      type: 'many-to-one'
    }
  }
});
