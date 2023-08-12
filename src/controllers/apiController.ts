import { Request, Response } from 'express';
import { Projects } from '../models/Projects';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const getProjects = async (req: Request, res: Response) => {
    let projects = await Projects.findAll()
    res.json({ projects });
}

// export const login = async (req: Request, res: Response) => {
//     if(req.body.email && req.body.password) {
//         let email: string = req.body.email;
//         let password: string = req.body.password;

//         let user = await User.findOne({ 
//             where: { email, password }
//         });

//         if(user) {
//             const token = jwt.sign(
//                 {id: user.id, email: user.email},
//                 process.env.JWT_KEY as string,
//                 {expiresIn: '2h'}
//             )
//             res.json({ status: true, token });
//             return;
//         }
//     }

//     res.json({ status: false });
// }

// export const list = async (req: Request, res: Response) => {
//     let users = await User.findAll();
//     let list: string[] = [];

//     for(let i in users) {
//         list.push( users[i].email );
//     }

//     res.json({ list });
// }