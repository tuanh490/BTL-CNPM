import pool from "../database.js";

export async function renderResidency(req, res) {
    const [residency] = await pool.query(`
        SELECT *
        FROM bien_dong_nhan_khau
        `)
    console.log(residency)
    res.render('residents/declare', { residency })
}

export async function createResidency(req, res) {
    let { ho_ten, trang_thai, thoi_gian, mo_ta, can_cuoc_cong_dan } = req.body.residency

    if (!thoi_gian)
        thoi_gian = null
    else {
        const time = Date.parse(thoi_gian)
        thoi_gian = new Date(time)
    }

    await pool.query(`
        INSERT INTO bien_dong_nhan_khau
        (ho_ten, trang_thai, thoi_gian, mo_ta, can_cuoc_cong_dan)
        VALUES
        (?, ?, ?, ?, ?);
        `, [ho_ten, trang_thai, thoi_gian, mo_ta, can_cuoc_cong_dan])

    req.flash('success', 'Cập nhật biến động nhân khẩu thành công!')
    res.redirect(303, '/residency')
}

export async function updateResidency(req, res) {
    const { id } = req.params
    let { ho_ten, trang_thai, thoi_gian, mo_ta, can_cuoc_cong_dan } = req.body.residency

    if (!thoi_gian)
        thoi_gian = null
    else {
        const time = Date.parse(thoi_gian)
        thoi_gian = new Date(time)
    }

    const result = await pool.query(`
        UPDATE bien_dong_nhan_khau
        SET
        ho_ten = ?,
        trang_thai = ?, 
        thoi_gian = ?, 
        mo_ta = ?,
        can_cuoc_cong_dan = ?
        WHERE id = ?;
        `, [ho_ten, trang_thai, thoi_gian, mo_ta, can_cuoc_cong_dan, id])

    req.flash('success', 'Cập nhật biến động nhân khẩu thành công!')
    res.redirect(303, '/residency')
}

export async function deleteResidency(req, res) {
    const { id } = req.params
    const [rows] = await pool.query(`
        DELETE FROM bien_dong_nhan_khau
        WHERE id = ?;
        `, [id])

    req.flash('success', 'Cập nhật biến động nhân khẩu thành công!')
    res.redirect(303, '/residency')
}