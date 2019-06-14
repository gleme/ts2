const express = require('express');
const { Between } = require('typeorm');
const { pickBy, identity } = require('lodash');
const moment = require('moment');
const router = express.Router();
const { MedicalConsultation } = require('../../domain/model/medical-consultation');
const { injectRepository } = require('../../middlewares/repository');
const { publishMessage } = require('../../middlewares/event-message');
const {
  MedicalDiagnosisRepository
} = require('../../domain/repository/medical-diagnosis-repository');
const diagnosisRouter = require('./diagnosis');
const procedureRouter = require('./procedure');

router.all('*', injectRepository(MedicalConsultation));

router.use('/diagnosis', diagnosisRouter);
router.use('/procedure', procedureRouter);

router.post('/', async (req, res, next) => {
  try {
    const { date, prescription, patient, physician, procedures, diagnosis } = req.body;
    const diagnosisRepo = new MedicalDiagnosisRepository(req.app.locals.mongoDb);

    const cid10 = [];
    for (let d of diagnosis) {
      const code = await diagnosisRepo.findByCode(d.code);
      cid10.push(code);
    }
    const consultation = new MedicalConsultation(
      date,
      prescription,
      patient,
      physician,
      procedures,
      cid10
    );
    const consult = await req.app.locals.repository.save(consultation);
    publishMessage(MedicalConsultation, req.app.locals.kafkaProducer, consult);
    res.status(200).json({ protocol: consult.protocol });
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { cpf, expand, start, end } = req.query;
    const relations = expand.split(',').length > 0 ? expand.split(',') : undefined;
    const patientCpf = cpf ? cpf : undefined;
    let startDate, endDate;

    if (start && end) {
      startDate = moment(start)
        .startOf('date')
        .toDate();
      endDate = moment(end)
        .endOf('date')
        .toDate();
    } else if (start) {
      startDate = moment(start)
        .startOf('date')
        .toDate();
      endDate = moment()
        .endOf('date')
        .toDate();
    }

    let query = pickBy(
      {
        relations,
        patientCpf,
        where: pickBy(
          {
            date: startDate && endDate ? Between(startDate, endDate) : undefined
          },
          identity
        )
      },
      identity
    );
    const consultations = await req.app.locals.repository.find(query);
    res.status(200).json(consultations);
  } catch (error) {
    next(error);
  }
});

router.get('/:protocol', async (req, res, next) => {
  try {
    const { expand } = req.query;
    const { protocol } = req.params;
    const relations = expand.split(',').length > 0 ? expand.split(',') : undefined;
    const query = pickBy({ relations }, identity);
    const consultation = await req.app.locals.repository.findOne(protocol, query);
    consultation ? res.status(200).json(consultation) : res.status(404).end();
  } catch (error) {
    next(error);
  }
});

router.put('/:protocol', async (req, res, next) => {
  try {
    const { protocol } = req.params;
    const { prescription, date, physician, patient } = req.body;
    await req.app.locals.repository.update(protocol, {
      prescription,
      date,
      physician,
      patient
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete('/:protocol', async (req, res, next) => {
  try {
    const { protocol } = req.params;
    await req.app.locals.repository.delete(protocol);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
