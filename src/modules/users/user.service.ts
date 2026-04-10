import { pool } from "../../config/db"
import bcrypt from "bcrypt";

//post
const createUser = async (payload: Record<string, unknown>) => {
    const {name, email, password} = payload;
    const hashedPass = await bcrypt.hash(password as string, 10)
      const result = await pool.query(
      `INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *`,
      [name, email, hashedPass]
    )

    return result;
}

//get all
const getUsers = async () => {
    const result = await pool.query(`SELECT * FROM users` )
    return result
}

//get single
const getUser = async (id: any) => {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1 `, [id,] )
    return result;
}

//put(update)
const updateUser = async (name: string, email: string, id: any) => {
    const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id = $3 RETURNING * `, [name, email, id,] )

    return result;
}

//delete
const deleteUser = async (id: any) => {
    const result = await pool.query(`DELETE FROM users WHERE id = $1 `, [id,] )
    return result;
}

export const userServices = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
}