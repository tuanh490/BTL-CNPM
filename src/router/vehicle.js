import express from 'express'

import * as vehicle from '../controllers/vehicle.js'
import CatchAsync from '../utils/CatchAsync.js'
import { doesVehicleExist, validateVehicle } from '../middlewares/vehicleMiddleware.js'

const router = express.Router()

router.route('/')
    .get(CatchAsync(vehicle.renderVehicle))
    .post(validateVehicle, CatchAsync(vehicle.createVehicle))

router.route('/:id')
    .put(doesVehicleExist, validateVehicle, CatchAsync(vehicle.updateVehicle))
    .delete(doesVehicleExist, CatchAsync(vehicle.deleteVehicle))

export default router