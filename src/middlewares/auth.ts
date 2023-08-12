import { Request, Response, NextFunction } from "express"
import { User } from "../models/Projects";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        let sucess = false;

        if (req.headers.authorization) {

            const [authType, token] = req.headers.authorization.split(' ');
            if (authType === 'Bearer') {
                try{
                    const decoded = jwt.verify(token, process.env.JWT_KEY as string)
                    sucess = true
                } catch(err){
                    console.log(err)
                }
            }
        }

        if (sucess) {
            next()
        } else {
            res.status(403) // Not allowed
            res.json({ error: 'Não autorizado.' })
        }
    }
}