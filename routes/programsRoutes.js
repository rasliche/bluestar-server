const router = require('express').Router({ mergeParams: true })
const auth = require('../middleware/authenticated')
const admin = require('../middleware/admin')
const programsController = require('../controllers/programsController')
const { body, param } = require('express-validator')

router.get('/', programsController.index)

router.post('/', [auth, admin], 
    [
        body('name')
            .trim()
    ], 
    programsController.create)

router.get('/:programId', 
    [
        param('programId')
            .isMongoId()
    ],
    programsController.read)

router.put('/:programId', [auth, admin], 
    [
        param('programId')
            .isMongoId(),
        body('name')
            .trim()
    ], 
    programsController.update)

router.delete('/:programId', [auth, admin], 
    [
        param('programId')
            .isMongoId()
    ],
    programsController.destroy)

module.exports = router