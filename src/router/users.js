import express from 'express'

import * as users from '../controllers/users.js'
import CatchAsync from '../utils/CatchAsync.js'
import { isAuthenticated } from '../middlewares/userMiddleware.js'

const router = express.Router()

router.route('/register')
    .get(/*isAuthenticated,*/ users.renderRegister)
    .post(isAuthenticated, CatchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(users.login)

router.post('/logout', users.logout)

router.route('/change_password')
    .post(isAuthenticated, CatchAsync(users.changePassword))

router.get('/profile', isAuthenticated, CatchAsync(users.getProfile))

export default router