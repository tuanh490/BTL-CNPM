import pool from '../database.js'
import ExpressError from '../utils/ExpressError.js'
import checkObject from '../utils/checkObject.js'
import { monthlyBillInsert } from '../monthlyInsert/monthlyInsert.js'

export async function renderRooms(req, res) {
    const [rooms] = await pool.query(`
        SELECT phong.*, nhan_khau.ho_ten 
        FROM phong
        LEFT JOIN nhan_khau ON 
        phong.can_cuoc_cong_dan = nhan_khau.can_cuoc_cong_dan;
        `)

    res.render('rooms/index', { rooms })
}

export async function createRoom(req, res, next) {
    let { ma_phong, can_cuoc_cong_dan, trang_thai, dien_tich } = req.body.room

    const roomExist = await checkObject("phong", "ma_phong", ma_phong)
    if (roomExist) {
        req.flash('error', 'Mã phòng đã tồn tại!')
        return res.redirect(303, '/rooms')
    }

    if (can_cuoc_cong_dan.toUpperCase() == 'NULL' || !can_cuoc_cong_dan) {
        can_cuoc_cong_dan = null;
        trang_thai = 0;
    }
    else {
        const checkResident = await checkObject("nhan_khau", "can_cuoc_cong_dan", can_cuoc_cong_dan)
        if (!checkResident) {
            req.flash('error', 'Không tìm thấy căn cước công dân!')
            return res.redirect(303, '/rooms')
        }

        trang_thai = 1;
    }

    const [result] = await pool.query(`CALL Them_phong(?, ?, ?, ?);`,
        [ma_phong, trang_thai, dien_tich, can_cuoc_cong_dan])

    if (trang_thai == 1) {
        await monthlyBillInsert(ma_phong, new Date())
    }

    req.flash('success', 'Tạo phòng thành công!')
    res.redirect(303, `/rooms`)
}

export async function updateRoom(req, res) {
    const { id } = req.params
    let { trang_thai, dien_tich, can_cuoc_cong_dan } = req.body.room

    if (can_cuoc_cong_dan.toUpperCase() == 'NULL') {
        can_cuoc_cong_dan = null;
        trang_thai = 0;
    }
    else {
        const checkResident = await checkObject("nhan_khau", "can_cuoc_cong_dan", can_cuoc_cong_dan)
        if (!checkResident) {
            req.flash('error', 'Không tìm thấy căn cước công dân!')
            return res.redirect(303, '/rooms')
        }

        trang_thai = 1;
    }

    let [old_dien_tich] = await pool.query(`
        SELECT dien_tich
        FROM phong
        WHERE ma_phong = ?;
        `, [id]);

    console.log(old_dien_tich[0])

    old_dien_tich = old_dien_tich[0].dien_tich


    await pool.query(`
        UPDATE phong
        SET
        trang_thai = ?,
        dien_tich = ?,
        can_cuoc_cong_dan = ?
        WHERE ma_phong = ?;
        `, [trang_thai, dien_tich, can_cuoc_cong_dan, id])

    if (trang_thai == 1) {
        const [rows] = await pool.query(`
                SELECT *
                FROM thanh_toan_hang_thang
                WHERE ma_phong = ?
                AND MONTH(thoi_gian) = ?
                AND YEAR(thoi_gian) = ?
                `, [id, new Date().getMonth() + 1, new Date().getFullYear()])

        if (rows.length == 0) {
            await monthlyBillInsert(id, new Date())
        } else {
            if (old_dien_tich != dien_tich) {
                try {
                    await pool.query(`
                        UPDATE phi_hang_thang
                        SET
                        so_tien = Tinh_phi_dich_vu_hang_thang(?)
                        WHERE id_thanh_toan = ?
                        AND loai_phi = "phí dịch vụ chung cư";
                        `, [id, rows[0].id_thanh_toan])

                    await pool.query(`
                        UPDATE phi_hang_thang
                        SET
                        so_tien = Tinh_phi_quan_ly_hang_thang(?)
                        WHERE id_thanh_toan = ?
                        AND loai_phi = "phí quản lý chung cư";
                        `, [id, rows[0].id_thanh_toan])

                    await pool.query(`
                        UPDATE thanh_toan_hang_thang
                        SET
                        tong_tien_can_dong = Tinh_tong_tien(?)
                        WHERE id_thanh_toan = ?;
                        `, [rows[0].id_thanh_toan, rows[0].id_thanh_toan])

                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    console.log("Hello")

    req.flash('success', 'Cập nhật phòng thành công')
    res.redirect(303, `/rooms`)
}

export async function deleteRoom(req, res) {
    const { id } = req.params

    const [rows] = await pool.query(`
        SELECT can_cuoc_cong_dan
        FROM phong
        WHERE ma_phong = ?;
        `, [id])

    if (rows[0].can_cuoc_cong_dan) {
        req.flash('error', 'Vui lòng sửa căn cước công dân trước khi xóa căn hộ!')
        return res.redirect(303, '/rooms')
    }

    await pool.query(`CALL Xoa_phong(?)`, [id])
    req.flash('success', 'Xóa phòng thành công')
    res.redirect(303, '/rooms')
}