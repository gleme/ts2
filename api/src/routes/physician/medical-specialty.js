const express = require('express');
const router = express.Router();
const { MedicalSpecialty } = require('../../domain/model/medical-specialty');
const { injectRepository } = require('../../middlewares/repository');
const { body, check, validationResult } = require('express-validator/check');

router.all('*', injectRepository(MedicalSpecialty));

router.get('/', async (req, res, next) => {
    try {
        const specialties = await req.app.locals.repository.find();
        res.status(200).json(specialties);
    } catch (error) {
        next(error);
    }
});

router.post('/', [
    check('name').not().isEmpty().withMessage('Speciality name cannot be empty.'),
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const { name } = req.body;
        const specialty = new MedicalSpecialty(name);
        const savedSpecialty = await req.app.locals.repository.save(specialty);
        res.status(200).json(savedSpecialty);
    } catch (error) {
        next(error);
    }
});

router.get('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        const specialty = await req.app.locals.repository.findOne(code);
        res.status(200).json(specialty);
    } catch (error) {
        next(error);
    }
});

router.put('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        const { name } = req.body;
        await req.app.locals.repository.update(code, { name });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

router.delete('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        await req.app.locals.repository.delete(code);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
