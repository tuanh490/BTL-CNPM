import express from 'express'

import * as residents from '../controllers/residents.js'
import CatchAsync from '../utils/CatchAsync.js'

const router = express.Router()

router.route('/')
    .get(CatchAsync(residents.renderResidents))
    .post(CatchAsync(residents.createResident))

router.route('/:id')
    .get(CatchAsync(residents.showResident))
    .put(CatchAsync(residents.updateResident))
    .delete(CatchAsync(residents.deleteResident))

export default router