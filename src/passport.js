import passport from 'passport'
import { Strategy } from 'passport-local';
import pool from './database.js'
import bcrypt from 'bcrypt'

async function comparePassword(candidatePassword, password) {
    return await bcrypt.compare(candidatePassword, password);
}

passport.use(
    new Strategy(
        { usernameField: 'username' },
        async (username, candidatePassword, done) => {
            try {
                const [rows] = await pool.query(`
                    SELECT *
                    FROM users
                    WHERE username = ?;
                    `, [username]);

                if (rows.length == 0) {
                    return done(null, false, { message: 'Incorrect username or password.' });
                }

                const user = rows[0];
                const password = user.password_hash
                const isMatch = await comparePassword(candidatePassword, password);
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect username or password.' });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const [rows] = await pool.query(`
            SELECT *
            FROM users
            WHERE id = ?;
            `, [id]);
        done(null, rows[0]);
    } catch (err) {
        done(err, null);
    }
});

export default passport