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

router.route('/logout')
    .get(users.logout)

router.route('/change_password')
    .get(isAuthenticated, CatchAsync(users.renderChangePasswrod))
    .post(isAuthenticated, CatchAsync(users.changePassword))

router.route('/profile')
    .get(isAuthenticated, CatchAsync(users.getProfile))

router.route('/profile/:id')
    .put(isAuthenticated, CatchAsync(users.updateProfile))

export default router