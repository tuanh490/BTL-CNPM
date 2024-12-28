import pool from '../database.js'

export async function renderVehicle(req, res) {
    const [vehicle] = await pool.query(`
        SELECT *
        FROM xe
        `)

    res.render('vehicle/index', { vehicle })
}

export async function createVehicle(req, res) {
    let { ma_phong, loai_xe, bien_xe } = req.body.vehicle

    const [result] = await pool.query(`CALL Them_xe(?, ?, ?);`,
        [ma_phong, loai_xe, bien_xe])

    res.redirect(303, `/vehicle`)
}

export async function showVehicle(req, res) {
    res.render('vehicle/show')
}

export async function updateVehicle(req, res) {
    const { id } = req.params
    let { ma_phong, loai_xe, bien_xe } = req.body.vehicle

    const result = await pool.query(`
        UPDATE phong
        SET
        ma_phong = ?,
        loai_xe = ?,
        bien_xe = ?
        WHERE bien_xe = ?;
        `, [ma_phong, loai_xe, bien_xe, id])

    res.redirect(303, `/vehicle`)
}

export async function deleteVehicle(req, res) {
    const { id } = req.params
    const [rows] = await pool.query(`CALL Xoa_xe(?)`, [id])
    res.redirect(303, '/vehicle')
}