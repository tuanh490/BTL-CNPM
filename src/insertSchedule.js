import pool from './database.js'
import { CronJob } from 'cron'

export async function monthlyInsert() {
    const currentDate = new Date().toISOString().split('T')[0]
    const currentMonth = new Date().getMonth() + 1 // + 1 because of the dumbest shit ever

    // Insert all bills for all occupied rooms
    const [rows] = await pool.query(`CALL insert_phi_hang_thang(?)`, [currentDate])
    // Insert electricity bills for all monthly_bills of this
    await pool.query(`
        INSERT INTO phi_tu_nhap
        (id_thanh_toan, loai_phi, mo_ta, so_tien, thoi_gian)
        SELECT t.id_thanh_toan, "Phí điện", "Tổng số tiền điện", 0, ?
        FROM thanh_toan_hang_thang t
        WHERE MONTH(t.thoi_gian) = ?;
        `, [currentDate, currentMonth])

    // Insert water bills for all monthly_bills of this 
    const result = await pool.query(`
        INSERT INTO phi_tu_nhap
        (id_thanh_toan, loai_phi, mo_ta, so_tien, thoi_gian)
        SELECT t.id_thanh_toan, "Phí nước", "Tổng số tiền nước", 0, ?
        FROM thanh_toan_hang_thang t
        WHERE MONTH(t.thoi_gian) = ?;
        `, [currentDate, currentMonth])

    // Insert Internet bills for all monthly_bills of this 
    await pool.query(`
        INSERT INTO phi_tu_nhap
        (id_thanh_toan, loai_phi, mo_ta, so_tien, thoi_gian)
        SELECT t.id_thanh_toan, "Internet", "Tiền Internet", 0, ?
        FROM thanh_toan_hang_thang t
        WHERE MONTH(t.thoi_gian) = ?;
        `, [currentDate, currentMonth])

    // Insert all bills from phi_co_so for each thanh_toan_hang_thang bill 
    await pool.query(`
        INSERT INTO phi_hang_thang (id_thanh_toan, loai_phi, so_tien, mo_ta)
        SELECT t.id_thanh_toan, p.loai_phi, p.gia_co_so, p.mo_ta
        FROM thanh_toan_hang_thang t
        CROSS JOIN phi_co_so p
        WHERE loai_phi NOT IN ("phí xe máy", "phí ô tô", "phí dịch vụ chung cư", "phí quản lý chung cư")
        AND MONTH(thoi_gian) = ?;
        `, [currentMonth])

    // Insert vehicle bills
    await pool.query(`
        INSERT INTO phi_hang_thang (id_thanh_toan, loai_phi, so_tien, mo_ta)
        SELECT id_thanh_toan, "phí xe cộ", Tinh_tien_gui_xe(ma_phong), "phí xe cộ hàng tháng"
        FROM thanh_toan_hang_thang
        WHERE MONTH(thoi_gian) = ?;
        `, [currentMonth])

    // Insert all management bills
    await pool.query(`
        INSERT INTO phi_hang_thang (id_thanh_toan, loai_phi, so_tien, mo_ta)
        SELECT id_thanh_toan, "phí dịch vụ chung cư", Tinh_phi_dich_vu_hang_thang(ma_phong), "phí dịch vụ chung cư đồng/m2/tháng"
        FROM thanh_toan_hang_thang
        WHERE MONTH(thoi_gian) = ?;
        `, [currentMonth])

    // Insert all service bills
    await pool.query(`
        INSERT INTO phi_hang_thang (id_thanh_toan, loai_phi, so_tien, mo_ta)
        SELECT id_thanh_toan, "phí quản lý chung cư", Tinh_phi_dich_vu_hang_thang(ma_phong), "phí quản lý chung cư đồng/m2/tháng"
        FROM thanh_toan_hang_thang
        WHERE MONTH(thoi_gian) = ?;
        `, [currentMonth])

    // Update tong_tien for thanh_toan_hang_thang for this month
    await pool.query(`
        UPDATE thanh_toan_hang_thang
        SET tong_tien_can_dong = Tinh_tong_tien(id_thanh_toan)
        WHERE MONTH(thoi_gian) = ?;
        `, [currentMonth])
}

const job = new CronJob(
    '0 0 0 1 * *',
    async function () {
        try {
            console.log(`Start job at ${new Date()}`)
            await monthlyInsert();
            console.log("Successfully Inserted")
        }
        catch (err) {
            console.log(err)
        }
    },
    null,
    false
);

export default job;

