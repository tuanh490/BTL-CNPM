import checkObject from "../utils/checkObject.js";
import { monthlyBillSchema } from "../schemas.js";
import ExpressError from "../utils/ExpressError.js";

export async function doesMonthlyBillExist(req, res, next) {
    const { id } = req.params

    if (!(await checkObject("thanh_toan_hang_thang", "id_thanh_toan", id))) {
        req.flash('error', 'Bill not found')
        console.log('Running from monthly bill')
        return res.redirect(303, '/monthly_bills')
    }
    next();
}


export async function validateMonthlyBill(req, res, next) {
    const { error } = monthlyBillSchema.validate(req.body.monthly_bill)
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        next(new ExpressError(msg, 400))
    } else {
        next()
    }
}
