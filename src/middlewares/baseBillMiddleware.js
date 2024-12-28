import checkObject from "../utils/checkObject.js";
import { baseBillSchema } from "../schemas.js";
import ExpressError from "../utils/ExpressError.js";

export async function doesBaseBillExist(req, res, next) {
    const { id } = req.params

    if (!checkObject("phi_co_so", "id_phi_co_so", id)) {
        req.flash('error', 'Base bill not found')
        return res.redirect(303, '/base_bills')
    }
    next();
}

export async function validateBaseBill(req, res, next) {
    const { error } = baseBillSchema.validate(req.body.base_bill)
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        next(new ExpressError(msg, 400))
    } else {
        next()
    }
}
