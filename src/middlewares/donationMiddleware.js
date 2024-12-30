import checkObject from "../utils/checkObject.js";
import { donationSchema } from "../schemas.js";
import ExpressError from "../utils/ExpressError.js";

export async function doesDonationExist(req, res, next) {
    const { id } = req.params

    if (!(await checkObject("khoan_phi_ung_ho", "id", id))) {
        req.flash('error', 'Donation not found')
        return res.redirect(303, '/donations')
    }
    next();
}

export async function validateDonation(req, res, next) {
    const { error } = donationSchema.validate(req.body.donation)
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        req.flash('error', msg)
        return res.redirect(303, '/donations')
    } else {
        next()
    }
}
