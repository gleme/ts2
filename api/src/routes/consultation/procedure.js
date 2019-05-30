const express = require('express');
const router = express.Router();
const { MedicalProcedure } = require('../../domain/model/medical-procedure');
const { injectRepository } = require('../../middlewares/repository');

router.all('*', injectRepository(MedicalProcedure));

router.post('/', async (req, res, next) => {
    try {
        const { name } = req.body;
        const procedure = new MedicalProcedure(name);
        await req.app.locals.repository.save(procedure);
        res.status(200).end();
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const procedures = await req.app.locals.repository.find();
        res.status(200).json(procedures);
    } catch (error) {
        next(error);
    }
});

router.get('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        const procedure = await req.app.locals.repository.findOne(code);
        res.status(200).json(procedure);
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
