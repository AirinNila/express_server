import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken"
import config from '../config';

// higher order function always func return kore

const auth = () => {
    return (req: Request, res: Response, next: NextFunction) => {
         try {

            const token = req.headers.authorization;
        console.log({authToken: token,});

        if(!token){
            return res.status(500).json({message: "you are not allowed"})
        }

        const decoded = jwt.verify(token, config.jwtSecret as string);
        console.log(decoded);
        req.user = decoded as JwtPayload;
        next()

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message

            })
        }
    }
}

export default auth;