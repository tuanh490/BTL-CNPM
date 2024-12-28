import checkObject from "../utils/checkObject.js";
import { vehicleSchema } from "../schemas.js";
import ExpressError from "../utils/ExpressError.js";

export async function doesVehicleExist(req, res, next) {
    const { id } = req.params

    if (checkObject("xe", "bien_xe", id)) {
        req.flash('error', 'Vehicle not found')
        return res.redirect(303, '/vehicle')
    }
    next();
}

export async function validateVehicle(req, res, next) {
    const { error } = vehicleSchema.validate(req.body.vehicle)
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        next(new ExpressError(msg, 400))
    } else {
        const vehicleExist = await checkObject("xe", "bien_xe", req.body.vehicle.ma_phong)
        if (!vehicleExist) {
            next(new ExpressError("This license plate is already in use", 400))
        }
    }
    next()
}
