import pool from '../../database.js'

export async function renderBaseBills(req, res) {
    const [base_bills] = await pool.query(`
        SELECT *
        FROM phi_co_so
        `)

    res.render('bills/base_bills/index', { base_bills })
}

export async function createBaseBill(req, res) {
    let { loai_phi, gia_co_so, mo_ta } = req.body.base_bill

    const [result] = await pool.query(`CALL Them_khoan_co_so(?, ?, ?);`,
        [loai_phi, gia_co_so, mo_ta])



    req.flash('success', 'Tạo phí thành công!')
    res.redirect(303, '/base_bills')
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

    console.log("Hello from updating base_bill")

    req.flash('success', 'Cập nhật phí thành công!')
    res.redirect(303, '/base_bills')
}

export async function deleteBaseBill(req, res) {
    const { id } = req.params
    const [rows] = await pool.query(`
        DELETE FROM phi_co_so
        WHERE id_phi_co_so = ?;
        `, [id])
    req.flash('success', 'Xóa phí thành công!')
    res.redirect(303, '/base_bills')
}
