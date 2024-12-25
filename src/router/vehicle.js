import express from 'express'

import * as vehicle from '../controllers/vehicle.js'
import CatchAsync from '../utils/CatchAsync.js'

const router = express.Router()

router.route('/')
    .get(CatchAsync(vehicle.renderVehicle))
    .post(CatchAsync(vehicle.createVehicle))

router.route('/:id')
    .get(CatchAsync(vehicle.showVehicle))
    .put(CatchAsync(vehicle.updateVehicle))
    .delete(CatchAsync(vehicle.deleteVehicle))

export default router