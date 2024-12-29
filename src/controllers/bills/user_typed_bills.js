import pool from '../../database.js'

export async function renderUserTypedBills(req, res) {
    const { id } = req.params
    const [user_typed_bills] = await pool.query(`
        SELECT loai_phi, so_tien, mo_ta, thoi_gian
        FROM phi_tu_nhap
        where id_thanh_toan = ?
        `, [id])

    res.render(`bills/user_typed_bills/index`, { user_typed_bills })
}

export async function createUserTypedBill(req, res, next) {
    const { id } = req.params;
    let { loai_phi, so_tien, mo_ta, thoi_gian } = req.body.user_typed_bill

    if (!thoi_gian)
        thoi_gian = null
    else {
        const time = Date.parse(thoi_gian)
        thoi_gian = new Date(time)
    }

    const [result] = await pool.query(`CALL Them_phi_tu_nhap(?, ?, ?, ?, ?);`,
        [id, loai_phi, so_tien, mo_ta, thoi_gian])

    req.flash('success', 'Successfully create a bill')
    res.redirect(303, `/monthly_bills/${id}/user_typed_bills`)
}

export async function updateUserTypedBill(req, res) {
    const { id, userTypedBillId } = req.params;
    let { loai_phi, so_tien, mo_ta, thoi_gian } = req.body.user_typed_bill

    if (!thoi_gian)
        thoi_gian = null
    else {
        const time = Date.parse(thoi_gian)
        thoi_gian = new Date(time)
    }

    const result = await pool.query(`
        UPDATE phi_tu_nhap
        SET
        loai_phi = ?,
        so_tien = ?,
        mo_ta = ?,
        thoi_gian = ?
        WHERE id = ? 
        `, [loai_phi, so_tien, mo_ta, thoi_gian, userTypedBillId])

    req.flash('success', 'Successfully update a bill')
    res.redirect(303, `/monthly_bills/${id}/user_typed_bills`)
}

export async function deleteUserTypedBill(req, res) {
    const { id, userTypedBillId } = req.params
    const [rows] = await pool.query(`
        DELETE FROM phi_tu_nhap
        WHERE id = ?;
        `, [userTypedBillId])

    req.flash('success', 'Successfully delete bill')
    res.redirect(303, `/monthly_bills/${id}/user_typed_bills`)
}