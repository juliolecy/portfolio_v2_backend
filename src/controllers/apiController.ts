import { Request, Response } from 'express';
import { Projects } from '../models/Projects';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { Skills } from '../models/Skills';

dotenv.config()

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const getProjects = async (req: Request, res: Response) => {
    let projects = await Projects.findAll()
    
    projects.forEach((i)=>{
        i.img = `${process.env.BASE}/media/projects/${i.img}`

        if(typeof(i.tech) === 'string' ){
            let techArray = i.tech.split(',')
            i.tech = techArray
        }

        
    
    }) 
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