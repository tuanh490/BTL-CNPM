import express from 'express'

import { renderLogin } from '../controllers/users.js'

const router = express.Router()

router.route('/register')
    .get()
    .post()

router.route('/login')
    .get(renderLogin)
    .post()

router.get('/logout')

export default router