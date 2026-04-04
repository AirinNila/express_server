import express, { NextFunction } from "express"
import { Request, Response } from 'express';
import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env")})
const app = express()
const port = 5000

const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`
})

const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    age INT,
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS todos(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE, 
    title VARCHAR(200) NOT NULL,
    completed BOOLEAN DEFAULT false,
    due_date DATE,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )`);
}

initDb()

//logger middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`
    [${new Date().toISOString()}], ${req.method}, ${req.path}\n`);
    next()
}

//parser
app.use(express.json())
//for getting form data
app.use(express.urlencoded())

app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello World! its Airin Nila')
})




//users CRUD
app.post('/users', async (req: Request, res: Response) => {
const {name, email} = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
      [name, email]
    )

    console.log(result);

    res.status(200).json({
      success: true,
      message: "data inserted successfully",
      data: result.rows[0],
    })

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }

})

// all users
app.get('/users', async (req: Request, res: Response) => {


  try {

    const result = await pool.query(`SELECT * FROM users` )
     res.status(200).json({
      success: true,
      message: "data read successfully",
      data: result.rows,
    })

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error
    })
  }

})

// single user users
app.get('/users/:id', async (req: Request, res: Response) => {


  try {

    const result = await pool.query(`SELECT * FROM users WHERE id = $1 `, [req.params.id,] )
 
    console.log(result.rows);
    if(result.rows.length === 0){
      res.status(404).json({
        success: false,
      message: "user not found",
      })
    }else{
           res.status(200).json({
      success: true,
      message: "user fetch successfully",
      data: result.rows[0],
    })
    }

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error
    })
  }

})

// single user update
app.put('/users/:id', async (req: Request, res: Response) => {

  const {name, email} = req.body;

  try {

    const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id = $3 RETURNING * `, [name, email, req.params.id,] )
 
    console.log(result.rows);
    if(result.rows.length === 0){
      res.status(404).json({
        success: false,
      message: "user not found",
      })
    }else{
           res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: result.rows[0],
    })
    }

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error
    })
  }

})

// delete user 
app.delete('/users/:id', async (req: Request, res: Response) => {


  try {

    const result = await pool.query(`DELETE FROM users WHERE id = $1 `, [req.params.id,] )
 
    console.log(result.rows);
    if(result.rowCount === 0){
      res.status(404).json({
        success: false,
      message: "user not found",
      })
    }else{
           res.status(200).json({
      success: true,
      message: "user deleted successfully",
      data: null,
    })
    }

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error
    })
  }

})


//ToDos CRUD
app.post('/todos', async (req: Request, res: Response) => {
const {user_id, title} = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,
      [user_id, title]
    )

    console.log(result);

    res.status(200).json({
      success: true,
      message: "todo created successfully",
      data: result.rows[0],
    })

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }

})

//all user todos
app.get('/todos', async (req: Request, res: Response) => {


  try {

    const result = await pool.query(`SELECT * FROM todos` )
     res.status(200).json({
      success: true,
      message: "todos data read successfully",
      data: result.rows,
    })

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error
    })
  }

})

// single user todos
app.get('/todos/:id', async (req: Request, res: Response) => {


  try {

    const result = await pool.query(`SELECT * FROM todos WHERE id = $1 `, [req.params.id,] )
 
    console.log(result.rows);
    if(result.rows.length === 0){
      res.status(404).json({
        success: false,
      message: "user todos not found",
      })
    }else{
           res.status(200).json({
      success: true,
      message: "user todos fetch successfully",
      data: result.rows[0],
    })
    }

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error
    })
  }

})

// single user todos update
app.put('/todos/:id', async (req: Request, res: Response) => {

  const {title} = req.body;

  try {

    const result = await pool.query(`UPDATE todos SET title=$1 WHERE id = $2 RETURNING * `, [title, req.params.id,] )
 
    console.log(result.rows);
    if(result.rows.length === 0){
      res.status(404).json({
        success: false,
      message: "user todos not found",
      })
    }else{
           res.status(200).json({
      success: true,
      message: "user todos updated successfully",
      data: result.rows[0],
    })
    }

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error
    })
  }

})

// delete user 
app.delete('/todos/:id', async (req: Request, res: Response) => {


  try {

    const result = await pool.query(`DELETE FROM todos WHERE id = $1 `, [req.params.id,] )
 
    console.log(result.rows);
    if(result.rowCount === 0){
      res.status(404).json({
        success: false,
      message: "user todos not found",
      })
    }else{
           res.status(200).json({
      success: true,
      message: "user Todos deleted successfully",
      data: null,
    })
    }

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error
    })
  }

})


//404 route set up
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path

  })
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
