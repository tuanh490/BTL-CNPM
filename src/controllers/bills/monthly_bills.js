import pool from '../../database.js'

export async function renderMonthlyBills(req, res) {
    const query = `
            SELECT
                ttht.id_thanh_toan,
                ttht.ma_phong,
                ttht.tong_tien_can_dong,
                ttht.thoi_gian,
                ttht.thoi_gian_dong,
                ttht.trang_thai,
            JSON_ARRAYAGG(CAST(JSON_OBJECT(
                'id', pht.id,
                'tenPhi', pht.loai_phi,
                'soTien', pht.so_tien,
                'moTa', pht.mo_ta
            ) AS JSON)) AS chiPhiHangThang,
            JSON_ARRAYAGG(CAST(JSON_OBJECT(
                'id', ptn.id,
                'tenPhi', ptn.loai_phi,
                'soTien', ptn.so_tien,
                'moTa', ptn.mo_ta
            ) AS JSON)) AS chiPhiKhac
            FROM thanh_toan_hang_thang ttht
            LEFT JOIN phi_hang_thang pht ON ttht.id_thanh_toan = pht.id_thanh_toan
            LEFT JOIN phi_tu_nhap ptn ON ttht.id_thanh_toan = ptn.id_thanh_toan
            GROUP BY ttht.id_thanh_toan;
        `;

    const [rows] = await pool.query(query);

    const removeDuplicates = (array) => {
        const seen = new Set();
        return array.filter(item => {
            const key = `${item.id}-${item.tenPhi}-${item.soTien}-${item.moTa}`;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    };

    const monthly_bills = rows.map(row => ({
        id_thanh_toan: row.id_thanh_toan,
        maCanHo: row.ma_phong,
        chiPhiHangThang: removeDuplicates(
            typeof row.chiPhiHangThang === 'string'
                ? JSON.parse(row.chiPhiHangThang || '[]')
                : row.chiPhiHangThang || []
        ),
        chiPhiKhac: removeDuplicates(
            typeof row.chiPhiKhac === 'string'
                ? JSON.parse(row.chiPhiKhac || '[]')
                : row.chiPhiKhac || []
        ),
        tongTien: row.tong_tien_can_dong,
        thoiGianThu: row.thoi_gian,
        thoiGianDong: row.thoi_gian_dong,
        trangThai: row.trang_thai
    }));


    res.render('bills/monthly_bills/index', { monthly_bills })
}

export async function updateMonthlyBill(req, res) {
    const { id } = req.params;
    let { thoi_gian_dong, trang_thai } = req.body.monthly_bill

    if (!thoi_gian_dong) {
        thoi_gian_dong = null
        trang_thai = 0
    }
    else {
        const time = Date.parse(thoi_gian_dong)
        thoi_gian_dong = new Date(time)
        trang_thai = 1
    }

    const result = await pool.query(`
        UPDATE thanh_toan_hang_thang
        SET
        thoi_gian_dong = ?,
        trang_thai = ?
        WHERE id_thanh_toan = ?;
        `, [thoi_gian_dong, trang_thai, id])

    req.flash('success', 'Cập nhật phí thành công!')
    res.redirect(303, '/monthly_bills')
}