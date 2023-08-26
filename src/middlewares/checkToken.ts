import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const checkToken = (req: Request,res: Response, next:NextFunction) => {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1]

if(!token){
return res.status(401).json({error: 'Acesso negado(1).'})
}

//Validar token
try{
    jwt.verify(token, process.env.JWT_KEY as string)
    console.log('Você está autorizado.')
    next()
}catch(err){
    res.status(400).json({err: 'Acesso negado(2).'})
}

}

export default checkToken