import express from "express"
import { Request, Response } from 'express';

import config from "./config";
import initDb, { pool } from "./config/db";
import { logger } from "./middleware/logger";
import { userRoutes } from "./modules/users/user.routes";
import { todosRoutes } from "./modules/todos/todos.routes";



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
app.use('/todos', todosRoutes)



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
