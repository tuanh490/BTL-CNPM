import express from 'express'

const router = express.Router()

router.route('/register')
    .get()
    .post()

router.route('/login')
    .get()
    .post()

router.get('/logout')

export default router