import checkObject from "../utils/checkObject.js";
import { userTypedBillSchema } from "../schemas.js";
import ExpressError from "../utils/ExpressError.js";

export async function doesUserTypedBillExist(req, res, next) {
    const { id, userTypedBillId } = req.params

    if (!(await checkObject("phi_tu_nhap", "id", userTypedBillId))) {
        req.flash('error', 'Bill not found')
        return res.redirect(303, `/monthly_bills`)
    }
    next();
}

export async function validateUserTypedBill(req, res, next) {
    const { id } = req.params
    const { error } = userTypedBillSchema.validate(req.body.user_typed_bill)
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        req.flash('error', msg)
        return res.redirect(303, `/monthly_bills`)
    } else {
        next()
    }
}
