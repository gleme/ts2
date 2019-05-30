const express = require('express');
const { In } = require('typeorm');
const router = express.Router();
const { Physician } = require('../../domain/model/physician');
const { MedicalSpecialty } = require('../../domain/model/medical-specialty');
const { injectRepository } = require('../../middlewares/repository');
const specialtyRouter = require('./medical-specialty');
const { check, validationResult } = require('express-validator/check');

router.use('/specialty', specialtyRouter);

router.all('*', injectRepository(Physician));

router.get('/', async (req, res, next) => {
    try {
        const physicians = await req.app.locals.repository.find();
        res.status(200).json(physicians);
    } catch (error) {
        next(error);
    }
});

router.post('/', [
    check('cpf').not().isEmpty().withMessage('Physician Cpf cannot be empty.'),
    check('cpf').custom( cpf => {
        const tempCpf = (''+cpf).toLowerCase().replace(new RegExp('[0-9]', 'g'), '');

        if((tempCpf.length > 1) || (tempCpf.length == 1 && tempCpf[0] != 'x')) {
            throw new Error('Physician Cpf contains invalid characters. Use only digits.');
        }

        return true;
    }),
    check('cpf').custom(async (cpf, { req }) => {
        const physicianObj = await req.app.locals.mysqlDb.getRepository(Physician).find({
            where: {
                cpf: cpf
            }
        });

        if(physicianObj.length) {
            throw new Error('Physician with this cpf already exists in database.');
        }

        return true;
    }),
    check('name').not().isEmpty().withMessage('Physician Name cannot be empty'),
    check('birthDate').not().isEmpty().withMessage('Physician Birthdate cannot be empty.'),
    check('birthDate').custom(date => {
        var timestamp = Date.parse(date);
        if (isNaN(timestamp)) {
            throw new Error('Physician Birthdate is not a valid Date.');
        }
        return true;
    }),
    check('gender').not().isEmpty().withMessage('Physician Gender cannot be empty.'),
    check('address').not().isEmpty().withMessage('Physician Address cannot be empty.'),
    check('phone').not().isEmpty().withMessage('Physician Phone cannot be empty.'),
    check('crm').not().isEmpty().withMessage('Physician Crm cannot be empty.'),
    check('crm').custom(async (crm, { req }) => {
        const physicianObj = await req.app.locals.mysqlDb.getRepository(Physician).find({
            where: {
                crm: crm
            }
        });

        if(physicianObj.length) {
            throw new Error('Physician with this crm already exists in database.');
        }

        return true;
    }),
    check('specialties').custom(async (specialties, { req }) => {
        const specialtiesObj = await req.app.locals.mysqlDb.getRepository(MedicalSpecialty).find({
            where: {
                code: In(specialties.map(spec => spec.code))
            }
        });

        if(req.body.specialties.length != specialtiesObj.length) {
            throw new Error('One or more speciality was not recognized in database.');
        }

        return true;
    }),
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const { cpf, name, birthDate, gender, address, phone, crm, specialties } = req.body;

        const specialtiesObj = await req.app.locals.mysqlDb.getRepository(MedicalSpecialty).find({
            where: {
                code: In(specialties.map(spec => spec.code))
            }
        });

        const physician = new Physician(
            cpf,
            name,
            birthDate,
            gender,
            phone,
            address,
            crm,
            specialtiesObj
        );

        await req.app.locals.repository.save(physician);
        res.status(200).end();
    } catch (error) {
        next(error);
    }
});

router.get('/:cpf', async (req, res, next) => {
    try {
        const { cpf } = req.params;
        const physician = await req.app.locals.repository.findOne(cpf);
        res.status(200).json(physician);
    } catch (error) {
        next(error);
    }
});

// router.put('/:cpf', async (req, res, next) => {
//     try {
//         const { cpf } = req.params;
//         const { name, birthDate, gender, address, phone, crm, specialties } = req.body;
//         const specialtiesObj = await req.app.locals.mysqlDb.getRepository(MedicalSpecialty).find({
//             where: {
//                 id: In(specialties.map(spec => spec.code))
//             }
//         });

//         await req.app.locals.repository.update(cpf, {
//             name,
//             birthDate,
//             gender,
//             address,
//             phone,
//             crm,
//             specialties: specialtiesObj
//         });
//         res.status(204).end();
//     } catch (error) {
//         next(error);
//     }
// });

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
