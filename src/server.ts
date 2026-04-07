import express from "express"
import { Request, Response } from 'express';

import config from "./config";
import initDb, { pool } from "./config/db";
import { logger } from "./middleware/logger";
import { userRoutes } from "./modules/users/user.routes";



const app = express()
const port = config.port


// initionalizing db
initDb()



//parser
app.use(express.json())
//for getting form data
app.use(express.urlencoded())

app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello World! its Airin Nila')
})




//users CRUD
app.use("/users", userRoutes)










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
