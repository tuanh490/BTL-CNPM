import pool from '../database.js'

export async function renderVehicle(req, res) {
    const [vehicle] = await pool.query(`
        SELECT *
        FROM xe
        `)

    res.render('vehicle/index', { vehicle })
}

export async function createVehicle(req, res, next) {
    let { ma_phong, loai_xe, bien_xe } = req.body.vehicle

    const vehicleExist = await checkObject("xe", "bien_xe", req.params.body.vehicle)
    if (vehicleExist) {
        req.flash('error', 'Vehicle already exists')
        return res.redirect(303, `/vehicle`)
    }

    const [result] = await pool.query(`CALL Them_xe(?, ?, ?);`,
        [ma_phong, loai_xe, bien_xe])

    req.flash('success', 'Successfully create vehicle')
    res.redirect(303, `/vehicle`)
}

export async function updateVehicle(req, res) {
    const { id } = req.params
    let { ma_phong, loai_xe, bien_xe } = req.body.vehicle

    const result = await pool.query(`
        UPDATE xe
        SET
        ma_phong = ?,
        loai_xe = ?,
        bien_xe = ?
        WHERE bien_xe = ?;
        `, [ma_phong, loai_xe, bien_xe, id])

    req.flash('success', 'Successfully update vehicle')
    res.redirect(303, `/vehicle`)
}

export async function deleteVehicle(req, res) {
    const { id } = req.params
    const [rows] = await pool.query(`CALL Xoa_xe(?)`, [id])
    req.flash('success', 'Successfully delete vehicle')
    res.redirect(303, '/vehicle')
}