import { roomSchema } from "../schemas.js";
import ExpressError from "../utils/ExpressError.js";
import checkObject from "../utils/checkObject.js"

export async function doesRoomExist(req, res, next) {
    const { id } = req.params

    if (checkObject("phong", "ma_phong", id)) {
        req.flash('error', 'Room not found')
        return res.redirect(303, '/rooms')
    }
    next();
}

export async function validateRoom(req, res, next) {
    const { error } = roomSchema.validate(req.body.room)
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        next(new ExpressError(msg, 400))
    } else {
        const roomExist = await checkObject("phong", "ma_phong", req.body.room.ma_phong)
        if (!roomExist) {
            next(new ExpressError("Room already exists", 400))
        }
    }
    next()
}