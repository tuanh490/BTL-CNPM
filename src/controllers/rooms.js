import pool from '../database.js'
import ExpressError from '../utils/ExpressError.js'

export async function renderRooms(req, res) {
    const [rows] = await pool.query(`
        SELECT *
        FROM phong
        `)

    res.render('rooms/index', { rows })
}

export async function createRoom(req, res) {
    let { ma_phong, can_cuoc_cong_dan, trang_thai, dien_tich } = req.body.room

    if (can_cuoc_cong_dan.toUpperCase() == 'NULL')
        can_cuoc_cong_dan = null;

    const [result] = await pool.query(`CALL Them_phong(?, ?, ?, ?);`,
        [ma_phong, trang_thai, dien_tich, can_cuoc_cong_dan])

    res.redirect(303, `/rooms`)
}

export async function showRoom(req, res, next) {
    const { id } = req.params
    const [rows] = await pool.query(`
        SELECT *
        FROM phong
        WHERE ma_phong = ?
        `, [id])

    res.render('rooms/show')
}

export async function updateRoom(req, res) {
    const { id } = req.params
    let { ma_phong, trang_thai, dien_tich, can_cuoc_cong_dan } = req.body.room

    if (can_cuoc_cong_dan.toUpperCase() == 'NULL')
        can_cuoc_cong_dan = null;

    const result = await pool.query(`
        UPDATE phong
        SET
        ma_phong = ?,
        trang_thai = ?,
        dien_tich = ?,
        can_cuoc_cong_dan = ?
        WHERE ma_phong = ?;
        `, [ma_phong, trang_thai, dien_tich, ma_phong, id])

    res.redirect(303, `/rooms/${ma_phong}`)
}

export async function deleteRoom(req, res) {
    const { id } = req.params
    const [rows] = await pool.query(`CALL Xoa_phong(?)`, [id])
    res.redirect(303, '/rooms')
}