const express = require('express');
const router = express.Router();
const { MedicalConsultation } = require('../../domain/model/medical-consultation');
const { injectRepository } = require('../../middlewares/repository');
const diagnosisRouter = require('./diagnosis');
const procedureRouter = require('./procedure');

router.all('*', injectRepository(MedicalConsultation));

router.use('/diagnosis', diagnosisRouter);
router.use('/procedure', procedureRouter);

router.post('/', async (req, res, next) => {
  try {
    const { date, prescription, patient, physician, procedures } = req.body;
    const consultation = new MedicalConsultation(
      date,
      prescription,
      patient,
      physician,
      procedures
    );
    await req.app.locals.repository.save(consultation);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const consultations = await req.app.locals.repository.find();
    res.status(200).json(consultations);
  } catch (error) {
    next(error);
  }
});

router.get('/:protocol', async (req, res, next) => {
  try {
    const { protocol } = req.params;
    const consultation = await req.app.locals.repository.findOne(protocol);
    res.status(200).json(consultation);
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
