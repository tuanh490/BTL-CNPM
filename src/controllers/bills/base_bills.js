import pool from '../../database.js'
import ExpressError from '../../utils/ExpressError.js'
import checkObject from '../../utils/checkObject.js'

export async function renderBaseBills(req, res) {
    const [base_bills] = await pool.query(`
        SELECT *
        FROM phong
        `)

    res.render('bills/base_bills/index', { base_bills })
}

export async function createBaseBill(req, res) {
    let { loai_phi, gia_co_so, mo_ta } = req.body.base_bill

    const [result] = await pool.query(`CALL Them_khoan_co_so(?, ?, ?);`,
        [loai_phi, gia_co_so, mo_ta])



    req.flash('success', 'Successfully create base bill')
    res.redirect(303, '/bills/base_bills')
}

export async function updateBaseBill(req, res) {
    const { id } = req.params
    let { loai_phi, gia_co_so, mo_ta } = req.body.base_bill

    const result = await pool.query(`
        UPDATE phi_co_so
        SET
        loai_phi = ?,
        gia_co_so = ?,
        mo_ta = ?
        WHERE id_phi_co_so = ?;
        `, [loai_phi, gia_co_so, mo_ta, id])

    req.flash('success', 'Successfully update base bill')
    res.redirect(303, '/bills/base_bills')
}

export async function deleteBaseBill(req, res) {
    const { id } = req.params
    const [rows] = await pool.query(`
        DELETE FROM phi_co_so
        WHERE id_phi_co_so = ?;
        `, [id])
    req.flash('success', 'Successfully delete base bill')
    res.redirect(303, '/bills/base_bills')
}
