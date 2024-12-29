import { residencySchema } from "../schemas.js";
import ExpressError from "../utils/ExpressError.js";
import checkObject from "../utils/checkObject.js"

export async function doesResidencyExist(req, res, next) {
    const { id } = req.params

    if (!(await checkObject("bien_dong_nhan_khau", "id", id))) {
        req.flash('error', 'Residency history not found')
        return res.redirect(303, '/residency')
    }
    next();
}

export async function validateResidency(req, res, next) {
    const { error } = residencySchema.validate(req.body.residency)
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        next(new ExpressError(msg, 400))
    } else {
        next()
    }
}
