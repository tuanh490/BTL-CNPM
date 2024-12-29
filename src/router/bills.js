import express from 'express'

import * as monthly_bills from '../controllers/bills/monthly_bills.js'
import * as user_typed_bills from '../controllers/bills/user_typed_bills.js'
import * as base_bills from '../controllers/bills/base_bills.js'
import CatchAsync from '../utils/CatchAsync.js'
import { doesBaseBillExist, validateBaseBill } from '../middlewares/baseBillMiddleware.js'
import { doesUserTypedBillExist, validateUserTypedBill } from '../middlewares/userTypedBillMiddleware.js'
import { doesMonthlyBillExist, validateMonthlyBill } from '../middlewares/monthlyBillMiddleware.js'

const router = express.Router()

router.route('/monthly_bills')
    .get(CatchAsync(monthly_bills.renderMonthlyBills))
// .post(validateMonthlyBill, CatchAsync(monthly_bills.createMonthlyBill))

router.route('/monthly_bills/:id')
    .put(doesMonthlyBillExist, validateMonthlyBill, CatchAsync(monthly_bills.updateMonthlyBill))
    .get(doesMonthlyBillExist, CatchAsync(monthly_bills.showMonthlyBill))

router.route('/monthly_bills/:id/user_typed_bills')
    .get(
        doesMonthlyBillExist,
        CatchAsync(user_typed_bills.renderUserTypedBills)
    )
    .post(
        doesMonthlyBillExist,
        validateUserTypedBill,
        CatchAsync(user_typed_bills.createUserTypedBill)
    )

router.route('/monthly_bills/:id/user_typed_bills/:userTypedBillId')
    .put(
        doesMonthlyBillExist,
        doesUserTypedBillExist,
        validateUserTypedBill,
        CatchAsync(user_typed_bills.updateUserTypedBill)
    )
    .delete(
        doesMonthlyBillExist,
        doesUserTypedBillExist,
        CatchAsync(user_typed_bills.deleteUserTypedBill)
    )

router.route('/base_bills')
    .get(CatchAsync(base_bills.renderBaseBills))
    .post(validateBaseBill, CatchAsync(base_bills.createBaseBill))

router.route('/base_bills/:id')
    .put(doesBaseBillExist, validateBaseBill, CatchAsync(base_bills.updateBaseBill))
    .delete(doesBaseBillExist, CatchAsync(base_bills.deleteBaseBill))

export default router