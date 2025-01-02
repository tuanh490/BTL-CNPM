import pool from "../database.js"
import checkObject from "../utils/checkObject.js"

export async function renderResidents(req, res) {
    const [residents] = await pool.query(`
        SELECT *
        FROM nhan_khau
        `)

    res.render('residents/index', { residents })
}

function fixDate(date) {
    if (!date)
        date = null
    else {
        const time = Date.parse(date)
        date = new Date(time)
    }
    return date;
}

export async function createResident(req, res) {
    let { can_cuoc_cong_dan, ma_phong, ho_ten, gioi_tinh, ngay_sinh, timeIn, timeOut, dang_o } = req.body.resident
    dang_o = 1;
    console.log(req.body.resident)

    const checkResident = await checkObject("nhan_khau", "can_cuoc_cong_dan", can_cuoc_cong_dan)
    if (checkResident) {
        req.flash('error', 'Căn cước công dân đã tồn tại!')
        return res.redirect(303, '/residents')
    }

    const roomExist = await checkObject("phong", "ma_phong", ma_phong)
    if (!roomExist) {
        req.flash('error', 'Mã phòng không tồn tại!')
        return res.redirect(303, '/residents')
    }

    ngay_sinh = fixDate(ngay_sinh)
    timeIn = fixDate(timeIn)
    timeOut = fixDate(timeOut)

    const result = await pool.query(`
        CALL Them_nhan_khau(?, ?, ?, ?, ?, ?, ?, ?);
        `, [can_cuoc_cong_dan, ma_phong, ho_ten, gioi_tinh, ngay_sinh, timeIn, timeOut, dang_o])

    req.flash('success', 'Thêm nhân khẩu thành công!')
    res.redirect(303, '/residents')
}

export async function updateResident(req, res) {
    const { id } = req.params
    let { can_cuoc_cong_dan, ma_phong, ho_ten, gioi_tinh, ngay_sinh, timeIn, timeOut, dang_o } = req.body.resident

    const roomExist = await checkObject("phong", "ma_phong", ma_phong)
    if (!roomExist) {
        req.flash('error', 'Mã phòng không tồn tại!')
        return res.redirect(303, '/rooms')
    }

    ngay_sinh = fixDate(ngay_sinh)
    timeIn = fixDate(timeIn)
    timeOut = fixDate(timeOut)

    const result = await pool.query(`
        UPDATE nhan_khau
        SET
        can_cuoc_cong_dan = ?,
        ma_phong = ?,
        ho_ten = ?,
        gioi_tinh = ?,
        ngay_sinh = ?,
        timeIn = ?,
        timeOut = ?,
        dang_o = ?
        WHERE id_nhan_khau = ?;
        `, [can_cuoc_cong_dan, ma_phong, ho_ten, gioi_tinh, ngay_sinh, timeIn, timeOut, dang_o, id])

    console.log('Hello from updating resident')

    req.flash('success', 'Cập nhật nhân khẩu thành công!')
    res.redirect(303, '/residents')
}

export async function deleteResident(req, res) {
    const { id } = req.params

    const [rows] = await pool.query(`
        SELECT can_cuoc_cong_dan
        FROM nhan_khau
        WHERE id_nhan_khau = ?;
        `, [id])
 
    const roomExist = await checkObject("phong", "can_cuoc_cong_dan", rows[0].can_cuoc_cong_dan)
    if (roomExist) {
        req.flash('error', 'Cư dân vẫn đang còn trong căn hộ! Vui lòng sửa phòng trước khi xóa!')
        return res.redirect(303, '/rooms')
    }

    await pool.query(`CALL Xoa_nhan_khau(?)`, [id])
    req.flash('success', 'Xóa nhân khẩu thành công!')
    res.redirect(303, '/residents')
}