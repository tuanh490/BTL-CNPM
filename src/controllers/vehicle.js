import pool from '../database.js'
import checkObject from '../utils/checkObject.js'

export async function renderVehicle(req, res) {
    const [vehicle] = await pool.query(`
        SELECT *
        FROM xe
        `)

    res.render('vehicle/index', { vehicle })
}

export async function createVehicle(req, res, next) {
    let { ma_phong, loai_xe, bien_xe } = req.body.vehicle

    const vehicleExist = await checkObject("xe", "bien_xe", bien_xe)
    if (vehicleExist) {
        req.flash('error', 'License plate is already in use')
        return res.redirect(303, `/vehicle`)
    }

    const roomExist = await checkObject("phong", "ma_phong", ma_phong)
    if (!roomExist) {
        req.flash('error', 'Room does not exist')
        return res.redirect(303, '/rooms')
    }

    const [result] = await pool.query(`CALL Them_xe(?, ?, ?);`,
        [ma_phong, loai_xe, bien_xe])

    req.flash('success', 'Successfully create vehicle')
    res.redirect(303, `/vehicle`)
}

export async function updateVehicle(req, res) {
    const { id } = req.params
    let { ma_phong, loai_xe, bien_xe } = req.body.vehicle

    if (id != bien_xe) {
        const vehicleExist = await checkObject("xe", "bien_xe", bien_xe)
        if (vehicleExist) {
            req.flash('error', 'License plate is already in use')
            return res.redirect(303, `/vehicle`)
        }
    }

    const roomExist = await checkObject("phong", "ma_phong", ma_phong)
    if (!roomExist) {
        req.flash('error', 'Room does not exist')
        return res.redirect(303, '/rooms')
    }

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