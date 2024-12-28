import pool from "../database.js";

export default async function checkObject(table, id_name, id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM ${table}
        WHERE ${id_name} = ?
        `, [id])

    return rows.length != 0;
}




