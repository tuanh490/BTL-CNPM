import bcrypt from 'bcrypt'
import pool from '../database.js'
import passport from '../passport.js'
import ExpressError from '../utils/ExpressError.js';

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export async function renderLogin(req, res) {
    console.log('Hello from renderLogin')
    res.render('users/login')
}

export async function renderRegister(req, res) {
    res.render('users/register')
}

export async function renderChangePasswrod(req, res) {
    res.render('users/change-password')
}

export async function register(req, res) {
    const { username, password, passwordConfirmation } = req.body;
    const [rows] = await pool.query(`
        SELECT *
        FROM users
        WHERE username = ?;
        `, [username])

    if (rows.length != 0) {
        req.flash('error', 'Tên tài khoản đã được sử dụng')
        return res.redirect(303, '/register')
    }

    if (password != passwordConfirmation) {
        req.flash('error', 'Mật khẩu không trùng khớp')
        return res.redirect(303, '/register')
    }

    const hashedPassword = await hashPassword(password);

    const [_rows] = await pool.query(`
        INSERT INTO users (username, password_hash)
        VALUES (?, ?);
        `, [username, hashedPassword])

    const [users] = await pool.query(`
        SELECT id, username
        FROM users
        where username = ?;
        `, [username])

    req.flash('success', 'Tạo tài khoản thành công')
    res.redirect(303, '/register')
}

export async function login(req, res, next) {
    const authenticationConfig = {
        failureFlash: true,
        failureRedirect: '/login',
        keepSessionInfo: true
    }

    console.log('Logging In')

    passport.authenticate('local', authenticationConfig, (err, user, info) => {
        if (err)
            return next(new ExpressError(500, "Có gì đã xảy ra"))

        if (!user) {
            req.flash('error', 'Tên đăng nhập hoặc mật khẩu không chính xác')
            return res.redirect(303, '/login')
        }

        req.logIn(user, (err) => {
            if (err)
                return res.status(500).json({ error: 'Đăng nhập không thành công' })

            const redirectUrl = req.session.returnTo || '/';
            delete req.session.returnTo
            req.flash('success', 'Đăng nhập thành công')
            res.redirect(303, redirectUrl);
        })
    },)(req, res, next)
}

export async function logout(req, res) {
    req.logout((err) => {
        if (err)
            return res.status(500).json({ error: 'Failed to log out' })

        res.redirect(303, '/')
    })
}

export async function changePassword(req, res) {
    const { newPassword, oldPassword, passwordConfirmation } = req.body;
    const userId = req.user.id;

    const [rows] = await pool.query(`
        SELECT password_hash
        FROM users
        WHERE id = ?;
        `, [userId])

    const isMatched = await bcrypt.compare(oldPassword, rows[0].password_hash)
    if (!isMatched) {
        req.flash('error', 'Mật khẩu cũ chưa chính xác')
        return res.redirect(303, '/change_password')
    }

    if (newPassword != passwordConfirmation) {
        req.flash('error', 'Mật khẩu không trùng khớp')
        return res.redirect(303, '/change_password')
    }

    const hashedPassword = await hashPassword(newPassword);
    const result = pool.query(`
            UPDATE users
            SET password_hash = ?
            WHERE id = ?;
            `, [hashedPassword, userId])

    if (result === 0)
        return res.status(404).json({ message: 'User not found' })

    req.flash('success', 'Đổi mật khẩu thành công')
    res.redirect(303, '/change_password')
}

export async function getProfile(req, res) {
    const userId = req.user.id;

    const [rows] = await pool.query(`
        SELECT username
        FROM users
        WHERE id = ?;
        `, [userId])

    res.render('users/user-info', { rows })
}