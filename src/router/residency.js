import express from 'express'

import * as residents from '../controllers/residency.js'
import CatchAsync from '../utils/CatchAsync.js'
import { doesResidencyExist, validateResidency } from '../middlewares/residencyMiddleware.js'

const router = express.Router()

router.route('/')
    .get(CatchAsync(residents.renderResidency))
    .post(validateResidency, CatchAsync(residents.createResidency))

router.route('/:id')
    .put(doesResidencyExist, validateResidency, CatchAsync(residents.updateResidency))
    .delete(doesResidencyExist, CatchAsync(residents.deleteResidency))

export default router