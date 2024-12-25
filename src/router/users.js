import express from 'express'

import * as users from '../controllers/users.js'
import CatchAsync from '../utils/CatchAsync.js'

const router = express.Router()

router.route('/register')
    .get(users.renderRegister)
    .post(CatchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(users.login)

router.post('/logout')

export default router