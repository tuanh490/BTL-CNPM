import express from 'express'

import * as donations from '../controllers/donations.js'
import CatchAsync from '../utils/CatchAsync.js'

const router = express.Router()

router.route('/')
    .get()
    .post()

router.route('/:id')
    .get()
    .put()
    .delete()

export default router
