const express = require('express');
const moment = require('moment');
const router = express.Router();
const { Screening } = require('../../domain/model/screening');
const { injectRepository } = require('../../middlewares/repository');

router.all('*', injectRepository(Screening));

router.get('/', async (req, res, next) => {
  try {
    const { cpf } = req.query;
    let query = req.app.locals.repository.createQueryBuilder('screening').where('1 = 1');
    if (cpf) {
      query = query.andWhere('screening.patientCpf = :cpf', { cpf });
    }
    const screenings = await query.getMany();
    res.status(200).json(screenings);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {
      patient,
      date,
      isReddish,
      isFever,
      isCough,
      isMalaise,
      isConjuctivitis,
      isCoryza,
      isLossAppetite,
      isWhiteSpots,
      isDiarrehea,
      isConvulsion,
      isEarInfection
    } = req.body;

    const screening = new Screening(
      patient,
      moment(date).toDate(),
      isReddish,
      isFever,
      isCough,
      isMalaise,
      isConjuctivitis,
      isCoryza,
      isLossAppetite,
      isWhiteSpots,
      isDiarrehea,
      isConvulsion,
      isEarInfection
    );
    await req.app.locals.repository.save(screening);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { expand } = req.query;

    let relations = [];
    if (expand) {
      relations = expand.split(',');
    }

    const screening = await req.app.locals.repository.findOne(id, { relations });
    res.status(200).json(screening);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      patient,
      date,
      isReddish,
      isFever,
      isCough,
      isMalaise,
      isConjuctivitis,
      isCoryza,
      isLossAppetite,
      isWhiteSpots,
      isDiarrehea,
      isConvulsion,
      isEarInfection
    } = req.body;

    await req.app.locals.repository.update(id, {
      patient,
      date,
      isReddish,
      isFever,
      isCough,
      isMalaise,
      isConjuctivitis,
      isCoryza,
      isLossAppetite,
      isWhiteSpots,
      isDiarrehea,
      isConvulsion,
      isEarInfection
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await req.app.locals.repository.delete(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
