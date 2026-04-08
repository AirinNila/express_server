import { pool } from "../../config/db"

//post
const createTodos = async (user_id: string, title: string) => {
     const result = await pool.query(
      `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,
      [user_id, title]
    )

    return result;
}

//get all
const getTodos = async () => {
    const result = await pool.query(`SELECT * FROM todos` )
    return result
}

//get single
const getTodo = async (id: any) => {
    const result = await pool.query(`SELECT * FROM todos WHERE id = $1 `, [id,] )
 
    return result;
}

//put(update)
const updateTodo = async ( title: string, id: any) => {
    const result = await pool.query(`UPDATE todos SET title=$1 WHERE id = $2 RETURNING * `, [title, id,] )

    return result;
}

//delete
const deleteTodo = async (id: any) => {
    
    const result = await pool.query(`DELETE FROM todos WHERE id = $1 `, [id,] )
    return result;
}

export const todosServices = {
    createTodos,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo,
}