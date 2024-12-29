import pool from './database.js'
import { CronJob } from 'cron'

export async function updateMonthlyPaymentAfterInsertion(id_thanh_toan, currentDate) {
    const ma_phong = (await pool.query(`
        SELECT ma_phong 
        FROM thanh_toan_hang_thang 
        WHERE id_thanh_toan = ?
        `, [id_thanh_toan]))[0][0].ma_phong

    await pool.query(`
        INSERT INTO phi_tu_nhap
        (id_thanh_toan, loai_phi, mo_ta, so_tien, thoi_gian)
        VALUES 
        (?, "Phí điện", "Tổng số tiền điện", 0, ?);
        `, [id_thanh_toan, currentDate])

    // Insert water bills for all monthly_bills of this 
    await pool.query(`
        INSERT INTO phi_tu_nhap
        (id_thanh_toan, loai_phi, mo_ta, so_tien, thoi_gian)
        VALUES 
        (?, "Phí nước", "Tổng số tiền nước", 0, ?);
        `, [id_thanh_toan, currentDate])

    // Insert Internet bills for all monthly_bills of this 
    await pool.query(`
        INSERT INTO phi_tu_nhap
        (id_thanh_toan, loai_phi, mo_ta, so_tien, thoi_gian)
        VALUES 
        (?, "Internet", "Tiền Internet", 0, ?);
        `, [id_thanh_toan, currentDate])

    // Insert all bills from phi_co_so for each thanh_toan_hang_thang bill 
    await pool.query(`
        INSERT INTO phi_hang_thang (id_thanh_toan, loai_phi, so_tien, mo_ta)
        SELECT ?, loai_phi, gia_co_so, mo_ta
        FROM phi_co_so
        WHERE loai_phi NOT IN ("phí xe máy", "phí ô tô", "phí dịch vụ chung cư", "phí quản lý chung cư");
        `, [id_thanh_toan])

    // Insert vehicle bills
    await pool.query(`
        INSERT INTO phi_hang_thang (id_thanh_toan, loai_phi, so_tien, mo_ta)
        VALUES 
        (?, "phí xe cộ", Tinh_tien_gui_xe(?), "phí xe cộ hàng tháng");
        `, [id_thanh_toan, ma_phong])

    // Insert all management bills
    await pool.query(`
        INSERT INTO phi_hang_thang (id_thanh_toan, loai_phi, so_tien, mo_ta)
        VALUES (?, "phí dịch vụ chung cư", Tinh_phi_dich_vu_hang_thang(?), "phí dịch vụ chung cư đồng/m2/tháng");
        `, [id_thanh_toan, ma_phong])

    // Insert all service bills
    await pool.query(`
        INSERT INTO phi_hang_thang (id_thanh_toan, loai_phi, so_tien, mo_ta)
        VALUES (?, "phí quản lý chung cư", Tinh_phi_quan_ly_hang_thang(?), "phí quản lý chung cư đồng/m2/tháng");
        `, [id_thanh_toan, ma_phong])

    // Update tong_tien for thanh_toan_hang_thang for this month
    await pool.query(`
        UPDATE thanh_toan_hang_thang
        SET tong_tien_can_dong = Tinh_tong_tien(id_thanh_toan)
        WHERE id_thanh_toan = ?;
        `, [id_thanh_toan])
}

async function monthlyInsert() {
    const currentDate = new Date().toISOString().split('T')[0]
    // Insert all bills for all occupied rooms
    const [rows] = await pool.query(`CALL insert_phi_hang_thang(?)`, [currentDate])

    for (let row of rows[0]) {
        // Insert electricity bills for all monthly_bills of this
        const id_thanh_toan = row["LAST_INSERT_ID()"]
        await updateMonthlyPaymentAfterInsertion(id_thanh_toan, currentDate)
    }
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

