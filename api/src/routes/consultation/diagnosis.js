const express = require('express');
const router = express.Router();
const {
  MedicalDiagnosisRepository
} = require('../../domain/repository/medical-diagnosis-repository');

router.all('*', (req, res, next) => {
  try {
    const mongodb = req.app.locals.mongoDb;
    req.app.locals.repository = new MedicalDiagnosisRepository(mongodb);
    next();
  } catch (error) {
    next(error);
  }
});

router.post('/search', async (req, res, next) => {
  try {
    const { disease } = req.body;
    const results = await req.app.locals.repository.findByDisease(disease);
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

router.get('/:code', async (req, res, next) => {
  try {
    const { code } = req.params;
    const diagnosis = await req.app.locals.repository.findByCode(code);
    res.status(200).json(diagnosis);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
