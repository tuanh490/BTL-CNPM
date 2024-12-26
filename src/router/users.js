import express from 'express'

import * as users from '../controllers/users.js'
import CatchAsync from '../utils/CatchAsync.js'
import { isAuthenticated } from '../middlewares/middleware.js'

const router = express.Router()

router.route('/register')
    .get(isAuthenticated, users.renderRegister)
    .post(CatchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(users.login)

router.post('/logout', users.logout)

router.post('/change_password', isAuthenticated, CatchAsync(users.changePassword))

router.get('/profile', isAuthenticated, CatchAsync(users.getProfile))

export default router