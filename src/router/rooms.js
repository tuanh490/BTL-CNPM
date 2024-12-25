import express from 'express'

import * as rooms from '../controllers/rooms.js'
import CatchAsync from '../utils/CatchAsync.js'

const router = express.Router()

router.route('/')
    .get(CatchAsync(rooms.renderRooms))
    .post(CatchAsync(rooms.createRoom))

router.route('/:id')
    .get(CatchAsync(rooms.showRoom))
    .put(CatchAsync(rooms.updateRoom))
    .delete(CatchAsync(rooms.deleteRoom))

export default router