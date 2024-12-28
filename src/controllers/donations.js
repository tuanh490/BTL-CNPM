import pool from '../database.js'

export async function renderDonations(req, res) {
    const [donations] = await pool.query(`
        SELECT *
        FROM khoan_phi_ung_ho
        `)

    res.render('donations/index', { donations })
}

export async function createDonation(req, res) {
    let { ma_phong, so_tien, mo_ta, thoi_gian } = req.body.donation

    if (!thoi_gian)
        thoi_gian = null
    else {
        const time = Date.parse(thoi_gian)
        thoi_gian = new Date(time)
    }

    const [result] = await pool.query(`CALL Them_khoan_phi_ung_ho(?, ?, ?, ?);`,
        [ma_phong, so_tien, mo_ta, thoi_gian])

    req.flash('success', 'Successfully create donation')
    res.redirect(303, '/donations')
}

export async function updateDonation(req, res) {
    const { id } = req.params
    let { ma_phong, so_tien, mo_ta, thoi_gian } = req.body.donation

    if (!thoi_gian)
        thoi_gian = null
    else {
        const time = Date.parse(thoi_gian)
        thoi_gian = new Date(time)
    }

    const result = await pool.query(`
        UPDATE khoan_phi_ung_ho
        SET
        ma_phong = ?,
        so_tien = ?,
        mo_ta = ?,
        thoi_gian = ?
        WHERE id = ?;
        `, [ma_phong, so_tien, mo_ta, thoi_gian, id])

    req.flash('success', 'Successfully update donation')
    res.redirect(303, '/donations')
}

export async function deleteDonation(req, res) {
    const { id } = req.params
    const [rows] = await pool.query(`CALL Xoa_khoan_phi_ung_ho(?)`, [id])
    req.flash('success', 'Successfully delete donation')
    res.redirect(303, '/donations')
}