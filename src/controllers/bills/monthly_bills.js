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
    const { id } = req.params
    const [phi_hang_thang] = await pool.query(`
        SELECT loai_phi, so_tien, mo_ta
        FROM phi_hang_thang
        WHERE id_thanh_toan = ? 
        `, [id])

    const [phi_tu_nhap] = await pool.query(`
        SELECT loai_phi, so_tien, mo_ta, thoi_gian
        FROM phi_tu_nhap
        WHERE id_thanh_toan = ?
        `, [id])


    // Fix to render
    res.redirect(303, `/monthly_bills/${id}`, { phi_hang_thang, phi_tu_nhap })
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
        UPDATE thanh_toan_hang_thang
        SET
        thoi_gian_dong = ?,
        trang_thai = ?
        WHERE id = ? 
        `, [thoi_gian_dong, trang_thai, id])

    req.flash('success', 'Successfully update a bill')
    res.redirect(303, '/monthly_bills"')
}