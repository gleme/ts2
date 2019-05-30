const express = require('express');
const router = express.Router();
const { Patient } = require('../../domain/model/patient');
const { injectRepository } = require('../../middlewares/repository');

router.all('*', injectRepository(Patient));

router.get('/', async (req, res, next) => {
    try {
        const patients = await req.app.locals.repository.find();
        res.status(200).json(patients);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { cpf, name, birthDate, gender, address, phone, email } = req.body;
        const patient = new Patient(cpf, name, birthDate, gender, address, phone, email);
        await req.app.locals.repository.save(patient);
        res.status(200).end();
    } catch (error) {
        next(error);
    }
});

router.get('/:cpf', async (req, res, next) => {
    try {
        const { cpf } = req.params;
        const patient = await req.app.locals.repository.findOne(cpf);
        res.status(200).json(patient);
    } catch (error) {
        next(error);
    }
});

router.put('/:cpf', async (req, res, next) => {
    try {
        const { cpf } = req.params;
        const { name, birthDate, gender, address, phone, email } = req.body;
        await req.app.locals.repository.update(cpf, {
            name,
            birthDate,
            gender,
            address,
            phone,
            email
        });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

router.delete('/:cpf', async (req, res, next) => {
    try {
        const { cpf } = req.params;
        await req.app.locals.repository.delete(cpf);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
