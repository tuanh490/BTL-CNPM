import pool from '../database.js'

export async function renderRooms(req, res) {
    const [rows] = await pool.query(`
        SELECT *
        FROM phong
        `)

    res.render('rooms/index', { rows })
}

export async function createRoom(req, res) {
    let { ma_phong, ma_chu_ho, trang_thai, dien_tich } = req.body.room

    if (ma_chu_ho.toUpperCase() == 'NULL')
        ma_chu_ho = null;

    const [rows] = await pool.query(`CALL Them_phong(?, ?, ?, ?);`,
        [ma_phong, ma_chu_ho, trang_thai, dien_tich])

    res.redirect(303, `/rooms/${ma_phong}`)
}

export async function showRoom(req, res) {
    const { id } = req.params
    const [rows] = await pool.query(`
        SELECT ma_phong, ma_chu_ho, trang_thai, dien_tich
        FROM phong
        WHERE ma_phong = ?
        `, [id])

    res.render('rooms/show')
}

export async function updateRoom(req, res) {
    const { id } = req.params
    let { ma_phong, ma_chu_ho, trang_thai, dien_tich } = req.body.room

    if (ma_chu_ho.toUpperCase() == 'NULL')
        ma_chu_ho = null;

    const [rows] = await pool.query(`
        UPDATE phong
        SET
        ma_phong = ?,
        ma_chu_ho = ?,
        trang_thai = ?,
        dien_tich = ?
        WHERE ma_phong = ?;
        `, [ma_phong, ma_chu_ho, trang_thai, dien_tich, ma_phong])

    res.redirect(303, `/rooms/${ma_phong}`)
}

export async function deleteRoom(req, res) {
    const { id } = req.params
    const [rows] = await pool.query(`CALL Xoa_phong(?)`, [id])
    res.redirect(303, '/rooms')
}