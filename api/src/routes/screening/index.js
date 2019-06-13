const express = require('express');
const { pickBy, identity } = require('lodash');
const moment = require('moment');
const router = express.Router();
const { Screening } = require('../../domain/model/screening');
const { injectRepository } = require('../../middlewares/repository');

router.all('*', injectRepository(Screening));

function notEmpty(object) {
  const filtered = pickBy(object, identity);
  const { length } = Object.keys(filtered);
  return length > 0 ? filtered : undefined;
}

router.get('/', async (req, res, next) => {
  try {
    const { cpf, expand } = req.query;
    const relations = expand.split(',').length > 0 ? expand.split(',') : undefined;
    let query = notEmpty({
      relations,
      where: notEmpty({
        patient: notEmpty({ cpf })
      })
    });
    const screenings = await req.app.locals.repository.find(query);

    const screeningWithInfo = screenings.map(screening => ({
      ...screening,
      score: screening.calculateMeaslesScore()
    }));
    res.status(200).json(screeningWithInfo);
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
    const { status, message, description } = screening.calculateMeaslesScore();
    const { measlesRate } = screening;
    const { id } = await req.app.locals.repository.save(screening);
    res.status(200).json({ id, score: { message, status, description }, measlesRate });
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
