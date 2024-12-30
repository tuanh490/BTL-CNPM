import { roomSchema } from "../schemas.js";
import ExpressError from "../utils/ExpressError.js";
import checkObject from "../utils/checkObject.js"

export async function doesRoomExist(req, res, next) {
    const { id } = req.params

    if (!(await checkObject("phong", "ma_phong", id))) {
        req.flash('error', 'Room not found')
        return res.redirect(303, '/rooms')
    }
    next();
}

export async function validateRoom(req, res, next) {
    const { error } = roomSchema.validate(req.body.room)
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        req.flash('error', msg)
        return res.redirect(303, '/rooms')
    } else {
        next()
    }
}
