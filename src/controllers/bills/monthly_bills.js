import pool from '../../database.js'

export async function renderMonthlyBills(req, res) {
    const [monthly_bills] = await pool.query(`
        SELECT ma_phong, tong_tien_can_dong, thoi_gian, thoi_gian_dong, trang_thai
        FROM thanh_toan_hang_thang
        `)

    res.render('bills/monthly_bills/index', { monthly_bills })
}

export async function createMonthlyBill(req, res) {
    // Currently not in use
    res.redirect('/monthly_bills/:id')
}

export async function showMonthlyBill(req, res) {
    // Currently not in use
    res.redirect(303, '/bills/monthly_bills/:id')
}

export async function updateMonthlyBill(req, res) {
    const { id } = req.params;
    let { thoi_gian_dong, trang_thai } = req.body.user_typed_bill

    if (!thoi_gian)
        thoi_gian = null
    else {
        const time = Date.parse(thoi_gian)
        thoi_gian = new Date(time)
    }

    const result = await pool.query(`
        UPDATE phi_tu_nhap
        SET
        thoi_gian_dong = ?,
        trang_thai = ?
        WHERE id = ? 
        `, [thoi_gian_dong, trang_thai, id])

    req.flash('success', 'Successfully update a bill')
    res.redirect(303, '/monthly_bills"')
}