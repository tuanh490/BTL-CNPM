import express from 'express'

import * as rooms from '../controllers/rooms.js'
import CatchAsync from '../utils/CatchAsync.js'
import { doesRoomExist, validateRoom } from '../middlewares/roomMiddleware.js'

const router = express.Router()

router.route('/')
    .get(CatchAsync(rooms.renderRooms))
    .post(validateRoom, CatchAsync(rooms.createRoom))

router.route('/:id')
    .put(doesRoomExist, validateRoom, CatchAsync(rooms.updateRoom))
    .delete(doesRoomExist, CatchAsync(rooms.deleteRoom))

export default router