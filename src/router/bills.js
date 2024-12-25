import express from 'express'

import * as monthly_bills from '../controllers/bills/monthly_bills.js'
import * as user_typed_bills from '../controllers/bills/user_typed_bills.js'
import * as base_bills from '../controllers/bills/base_bills.js'
import CatchAsync from '../utils/CatchAsync.js'


const router = express.Router()

router.route('/monthly_bills')
    .get(CatchAsync(monthly_bills.renderMonthlyBills))
    .post(CatchAsync(monthly_bills.createMonthlyBill))

router.route('/monthly_bills/:id')
    .get(CatchAsync(monthly_bills.showMonthlyBill))
    .put(CatchAsync(monthly_bills.updateMonthlyBill))

router.route('/user_typed_bills')
    .get(CatchAsync(user_typed_bills.renderUserTypedBills))
    .post(CatchAsync(user_typed_bills.createUserTypedBill))

router.route('/user_typed_bills/:id')
    .get(CatchAsync(user_typed_bills.showUserTypedBill))
    .put(CatchAsync(user_typed_bills.updateUserTypedBill))
    .delete(CatchAsync(user_typed_bills.deleteUserTypedBill))

router.route('/base_bills')
    .get(CatchAsync(base_bills.renderBaseBills))
    .post(CatchAsync(base_bills.createBaseBill))

router.route('/base_bills/:id')
    .get(CatchAsync(base_bills.showBaseBill))
    .put(CatchAsync(base_bills.updateBaseBill))
    .delete(CatchAsync(base_bills.deleteBaseBill))

export default router