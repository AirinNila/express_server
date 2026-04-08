import { Request, Response } from 'express';
import { todosServices } from './todos.service';

//post 
const createTodos =    async (req: Request, res: Response) => {
const {user_id, title} = req.body;

  try {
    const result = await todosServices.createTodos(user_id, title)

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

}

//get all
const getTodos =   async (req: Request, res: Response) => {


  try {

    const result = await todosServices.getTodos()
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

}

//get single
const getTodo =   async (req: Request, res: Response) => {
    const id = req.params.id

  try {

    const result = await todosServices.getTodo(id)

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

}

//put(update)
const updateTodo = async (req: Request, res: Response) => {

  const {title} = req.body;
  const id = req.params.id

  try {

    const result = await todosServices.updateTodo(title, id)
 
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

}

//delete
const deleteTodo = async (req: Request, res: Response) => {
    const id = req.params.id

  try {

    const result = await todosServices.deleteTodo(id)
 
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

}

export const todosControllers = {
    createTodos,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo,

}