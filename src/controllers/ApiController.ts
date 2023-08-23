import { Request, Response } from 'express';
import { Projects } from '../models/Projects';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { Skills } from '../models/Skills';
import { User } from '../models/User';
import bcrypt from 'bcrypt'

dotenv.config()

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const GetProjects = async (req: Request, res: Response) => {
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

export const Register = async (req: Request, res: Response) => {
    const { name, email, password, confirmpassword } = req.body
    if (!email) {
        return res.status(422).json({ error: 'Insira um email.' })
    }
    if (!name) {
        return res.status(422).json({ error: 'Insira um nome.' })
    }

    if (!password) {
        return res.status(422).json({ error: 'Insira uma senha.' })
    }
    if (!confirmpassword) {
        return res.status(422).json({ error: 'Confirme sua senha.' })
    }
    if (password !== confirmpassword) {
        return res.status(422).json({ error: 'As senhas devem ser iguais.' })
    }

    // Verificar se o email já existe no banco
    const userSearch = await User.findAll({ where: {email} })
    if (userSearch.length > 0) {
        return res.status(422).json({ error: 'Este email já está sendo utilizado.' })
    }

    //Criar senha
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //Criar usuário
    
    try { 
        // await user.save()
        // res.status(201).json({sucess: 'Usuário criado.'})

        const newUser = await User.create({
            name,
            email,
            passwordHash

        });
        res.status(201).json({ success: 'Usuário criado.' });
    } catch(e){
        console.log(e)
        res.status(500).json({error: 'Erro interno, tente novamente mais tarde.'})
    }
}


export const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email) {
        return res.status(422).json({ error: 'Insira um email.' })
    }
    if (!password) {
        return res.status(422).json({ error: 'Insira uma senha.' })
    }
    const user = await User.findOne({ where: {email} })
    
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' })
    }
    
    //Verificação de senha
    const checkPassword = await bcrypt.compare(password, user.passwordHash)
    if(!checkPassword){
        return res.status(422).json({ error: 'Senha inválida.' })
    }
    
    try{
        const token = jwt.sign({
            id: user.id
        },
        process.env.JWT_KEY as string)

        res.status(200).json({sucess: 'Usuário autenticado.',user, token}) 
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Ocorreu um erro no servidor. Tente novamente mais tarde.' })
    }
}
