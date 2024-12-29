import express from 'express'

import * as residents from '../controllers/residents.js'
import CatchAsync from '../utils/CatchAsync.js'
import { doesResidentExist, validateResident } from '../middlewares/residentMiddleware.js'

const router = express.Router()

router.route('/')
    .get(CatchAsync(residents.renderResidents))
    .post(validateResident, CatchAsync(residents.createResident))

router.route('/:id')
    .put(doesResidentExist, validateResident, CatchAsync(residents.updateResident))
    .delete(doesResidentExist, CatchAsync(residents.deleteResident))

export default router