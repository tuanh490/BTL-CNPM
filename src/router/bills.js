import express from 'express'

import { renderAllBills } from '../controllers/bills.js'

const router = express.Router()

router.route('/')
    .get(renderAllBills)
    .post()

router.route('/:id')
    .get()
    .put()
    .delete()

export default router