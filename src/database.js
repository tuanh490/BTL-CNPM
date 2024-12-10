import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
})

async function getItem(age) {
    try {
        const [rows] = await pool.query(`
            SELECT *
            FROM test_table
            WHERE age = ?
            `, [age])

        return rows;
    } catch (err) {
        console.log(err)
    }
}

export { getItem }