import pool from '../database.js'
import ExpressError from '../utils/ExpressError.js'
import checkObject from '../utils/checkObject.js'

export async function renderRooms(req, res) {
    const [rooms] = await pool.query(`
        SELECT *
        FROM phong
        `)

    res.render('rooms/index', { rooms })
}

export async function createRoom(req, res, next) {
    let { ma_phong, can_cuoc_cong_dan, trang_thai, dien_tich } = req.body.room

    const roomExist = await checkObject("phong", "ma_phong", req.body.room.ma_phong)
    if (roomExist) {
        req.flash('error', 'Room already exists')
        return res.redirect(303, '/rooms')
    }

    if (can_cuoc_cong_dan.toUpperCase() == 'NULL')
        can_cuoc_cong_dan = null;

    const [result] = await pool.query(`CALL Them_phong(?, ?, ?, ?);`,
        [ma_phong, trang_thai, dien_tich, can_cuoc_cong_dan])

    req.flash('success', 'Successfully create room')
    res.redirect(303, `/rooms`)
}

export async function updateRoom(req, res) {
    const { id } = req.params
    let { trang_thai, dien_tich, can_cuoc_cong_dan } = req.body.room

    if (can_cuoc_cong_dan.toUpperCase() == 'NULL')
        can_cuoc_cong_dan = null;

    const result = await pool.query(`
        UPDATE phong
        SET
        trang_thai = ?,
        dien_tich = ?,
        can_cuoc_cong_dan = ?
        WHERE ma_phong = ?;
        `, [trang_thai, dien_tich, can_cuoc_cong_dan, id])

    req.flash('success', 'Successfully update room')
    res.redirect(303, `/rooms`)
}

export async function deleteRoom(req, res) {
    const { id } = req.params
    const [rows] = await pool.query(`CALL Xoa_phong(?)`, [id])
    req.flash('success', 'Successfully delete room')
    res.redirect(303, '/rooms')
}