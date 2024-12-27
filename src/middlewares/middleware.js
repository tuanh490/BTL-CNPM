import pool from "../database.js";
import { roomSchema, vehicleSchema } from "../schemas.js";
import ExpressError from "../utils/ExpressError.js";

export function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized access.' });
}

async function checkRoom(id) {
    const [rows] = await pool.query(`
        SELECT ma_phong, trang_thai, dien_tich, can_cuoc_cong_dan
        FROM phong
        WHERE ma_phong = ?
        `, [id])

    return rows.length == 0
}

export async function doesRoomExist(req, res, next) {
    const { id } = req.params

    if (checkRoom(id)) {
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
        const roomExist = await checkRoom(req.body.room.ma_phong)
        if (!roomExist) {
            next(new ExpressError("Room already exists", 400))
        }
    }
    next()
}
