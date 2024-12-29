import checkObject from "../utils/checkObject.js";
import { userTypedBillSchema } from "../schemas.js";
import ExpressError from "../utils/ExpressError.js";

export async function doesUserTypedBillExist(req, res, next) {
    const { id, userTypedBillId } = req.params

    if (!(await checkObject("phi_tu_nhap", "id", userTypedBillId))) {
        req.flash('error', 'Bill not found')
        console.log('Running from user typed bill exist')
        return res.redirect(303, `/monthly_bills/${id}/user_typed_bills`)
    }
    next();
}

export async function validateUserTypedBill(req, res, next) {
    const { error } = userTypedBillSchema.validate(req.body.user_typed_bill)
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        next(new ExpressError(msg, 400))
    } else {
        next()
    }
}
