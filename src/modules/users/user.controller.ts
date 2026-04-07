import { Request, Response } from 'express';
import { pool } from "../../config/db";
import { userServices } from './user.service';

//post 
const createUser =   async (req: Request, res: Response) => {
const {name, email} = req.body;

  try {
   const result = await userServices.createUser(name, email)

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

}

//get all
const getUsers =  async (req: Request, res: Response) => {


  try {

    const result = await userServices.getUsers()
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

}

//get single
const getUser =  async (req: Request, res: Response) => {
 const id = req.params.id

  try {

    const result = await userServices.getUser(id)
 
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

}

//put(update)
const updateUser = async (req: Request, res: Response) => {

  const {name, email} = req.body;
  const id = req.params.id;

  try {

    const result =  await userServices.updateUser(name, email, id)
 
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

}

//delete
const deleteUser = async (req: Request, res: Response) => {

   const id = req.params.id;

  try {

    const result = await userServices.deleteUser(id)
 
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

}

export const userControllers = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,

}