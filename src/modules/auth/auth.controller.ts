import { Request, Response } from 'express';
import { userServices } from '../users/user.service';
import { authServices } from './auth.service';

//post 
const loginUser =   async (req: Request, res: Response) => {
    const {email, password} = req.body;

  try {
   const result = await authServices.loginUser(email, password)

    console.log(result);

    res.status(200).json({
      success: true,
      message: "login successfully",
      data: result
    })

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }

}

export const authControllers = {
    loginUser,
}