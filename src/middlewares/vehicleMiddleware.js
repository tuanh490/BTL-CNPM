import checkObject from "../utils/checkObject.js";
import { vehicleSchema } from "../schemas.js";
import ExpressError from "../utils/ExpressError.js";

export async function doesVehicleExist(req, res, next) {
    const { id } = req.params

    if (!(await checkObject("xe", "bien_xe", id))) {
        req.flash('error', 'Vehicle not found')
        return res.redirect(303, '/vehicle')
    }
    next();
}

export async function validateVehicle(req, res, next) {
    const { error } = vehicleSchema.validate(req.body.vehicle)
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        req.flash('error', msg)
        return res.redirect(303, '/vehicle')
    } else {
        next()
    }
}
