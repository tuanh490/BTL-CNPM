import express from 'express'

import * as donations from '../controllers/donations.js'
import CatchAsync from '../utils/CatchAsync.js'
import { doesDonationExist, validateDonation } from '../middlewares/donationMiddleware.js'

const router = express.Router()

router.route('/')
    .get(CatchAsync(donations.renderDonations))
    .post(validateDonation, CatchAsync(donations.createDonation))

router.route('/:id')
    .put(doesDonationExist, validateDonation, CatchAsync(donations.updateDonation))
    .delete(doesDonationExist, CatchAsync(donations.deleteDonation))

export default router
