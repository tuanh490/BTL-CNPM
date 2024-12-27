import bcrypt from 'bcrypt'
import pool from '../database.js'
import passport from '../passport.js'

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export async function renderLogin(req, res) {
    res.render('users/login')
}

export async function renderRegister(req, res) {
    res.render('users/register')
}

export async function register(req, res) {
    const { username, password } = req.body;
    const [rows] = await pool.query(`
        SELECT *
        FROM users
        WHERE username = ?;
        `, [username])

    if (rows.length != 0) {
        return res.status(400).json({ message: 'Username is already in use' })
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

    req.login(users[0], err => {
        if (err) return next(err);
        res.redirect(303, '/')
    })
}

export async function login(req, res, next) {
    const authenticationConfig = {
        failureFlash: true,
        failureRedirect: '/login',
        keepSessionInfo: true
    }

    passport.authenticate('local', authenticationConfig, (err, user, info) => {
        if (err)
            return res.status(500).json({ error: 'Internal Server Error' })

        if (!user)
            return res.status(401).json({ error: 'Invalid username or password' })

        req.logIn(user, (err) => {
            if (err)
                return res.status(500).json({ error: 'Failed to log in' })

            const redirectUrl = req.session.returnTo || '/';
            delete req.session.returnTo
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

function validatePassword(password) {
    return true
}

export async function changePassword(req, res) {
    const { password } = req.body;
    const userId = req.user.id;

    if (!validatePassword())
        return res.status(400).json({ message: 'Invalid password' })

    const hashedPassword = await hashPassword(password);
    const result = pool.query(`
            UPDATE users
            SET password_hash = ?
            WHERE id = ?;
            `, [hashedPassword, userId])

    if (result === 0)
        return res.status(404).json({ message: 'User not found' })

    res.redirect(303, '/')
}

export async function getProfile(req, res) {
    const userId = req.user.id;

    const [rows] = await pool.query(`
        SELECT username
        FROM users
        WHERE id = ?;
        `, [userId])

    res.send(rows[0])
}