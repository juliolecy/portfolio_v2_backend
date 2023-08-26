import { Request, Response } from 'express';
import { Projects } from '../models/Projects';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { Skills } from '../models/Skills';
import { User } from '../models/User';
import bcrypt from 'bcrypt'
import sharp from 'sharp'
import {unlink} from 'fs/promises'

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const GetProject = async (req: Request, res: Response) => {
    const {id} = req.body

    if(!id || typeof(id) === undefined){
        return res.json({ error: 'Insira um id.' });
    }

    let project = await Projects.findOne({where:{id}})

    if(!project || typeof(project) === undefined){
        return  res.json({ error: 'Projeto não encontrado.' });
    }
    //LEMBRAR DE MUDAR O ENDEREÇO DE ENVIO DA IMAGEM 

    
    // projects.forEach((i)=>{ 
    //     i.img = `${process.env.BASE}/media/projects/${i.img}`

    //     if(typeof(i.tech) === 'string' ){
    //         let techArray = i.tech.split(',')
    //         i.tech = techArray
    //     }

        
    
    // }) 

    return  res.json({ project });
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

export const EditProject = async (req: Request, res: Response) => {

    const { id, title, git, deploy, desc, tech} = req.body
  
    if (!id || typeof(id) === undefined) {
        return res.status(404).json({ error: 'Insira um id.' })
    }

    if (!title || typeof(title) === undefined) {
        return res.status(404).json({ error: 'Insira um título.' })
    }
    
    if (!git || typeof(git) === undefined) {
        return res.status(404).json({ error: 'Insira um repositório' })
    }
    
    if (!desc || typeof(desc) === undefined) {
        return res.status(404).json({ error: 'Insira uma descrição.' })
    }
    
    if (!deploy || typeof(deploy) === undefined) {
        return res.status(404).json({ error: 'Insira um endereço.' })
    }
    if (!tech || typeof(tech) === undefined) {
        return res.status(404).json({ error: 'Insira as tecnologias utilizadas.' })
    }

    if(req.file && typeof(req.file) !== undefined){
        let img = `${req.file.filename}.jpg`
        await sharp(req.file.path)
        .resize(500, 500, {
            fit: sharp.fit.cover
        })
        .toFormat('jpeg')
        .toFile(`./public/media/projects/${img}`)


        await unlink(req.file.path)

        await Projects.update({ tech, deploy, desc, git, title, img}, {
            where: {id}
        })

        return res.json({sucess: 'Projeto atualizado.'})
    }

await Projects.update({ tech, deploy, desc, git, title}, {
    where: {id}
})
 return res.json({sucess: 'Projeto atualizado.'})
}

export const CreateProject = async (req: Request, res: Response) => {

    let img = ''
    if(req.file){
        let filename = `${req.file.filename}.jpg`
        img = filename
        await sharp(req.file.path)
        .resize(500, 500, {
            fit: sharp.fit.cover
        })
        .toFormat('jpeg')
        .toFile(`./public/media/projects/${filename}`)

        await unlink(req.file.path)

    } else {
        return res.json({error: 'Envie uma imagem.'})
    }
    
    const { title, git, deploy, desc, tech} = req.body
  

if (!title || typeof(title) === undefined) {
    return res.status(404).json({ error: 'Insira um título.' })
}

if (!git || typeof(git) === undefined) {
    return res.status(404).json({ error: 'Insira um repositório' })
}

if (!desc || typeof(desc) === undefined) {
    return res.status(404).json({ error: 'Insira uma descrição.' })
}

if (!deploy || typeof(deploy) === undefined) {
    return res.status(404).json({ error: 'Insira um endereço.' })
}
if (!tech || typeof(tech) === undefined) {
    return res.status(404).json({ error: 'Insira as tecnologias utilizadas.' })
}

 const project = Projects.create({
title, git, desc, deploy, img, tech
 })

 return res.json({sucess: 'Projeto adicionado.'})
}

export const ValidateToken = async (req: Request, res: Response) => {
 return res.json({sucess: true})
}



   
   
