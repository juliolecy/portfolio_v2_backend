import { Request, Response } from 'express';
import { Projects } from '../models/Projects';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import bcrypt from 'bcrypt'
import sharp from 'sharp'
import { Courses } from '../models/Courses';
import fs from 'fs';

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const GetProject = async (req: Request, res: Response) => {
    const {id} = req.body

    if(!id || typeof(id) === undefined ){
        return res.json({ error: 'Insira um id válido.' });
    }

    let project = await Projects.findOne({where:{id}})

    if(!project || typeof(project) === undefined){
        return  res.json({ error: 'Projeto não encontrado.' });
    }

    project.img = Buffer.from(project.img, 'base64')


    return  res.json({ project });
}

export const GetProjects = async (req: Request, res: Response) => {
    let projects = await Projects.findAll()

    projects.forEach((item:any)=>{
        if(typeof(item.tech) === 'string' ){
            let techArray = item.tech.split(',')
            item.tech = techArray
        }
    })
    res.json({ projects });
}

export const AddCourse = async (req: Request, res: Response) => {
    const {title, topics, svg, total_hours, created_by, status} = req.body

    if (!title || typeof(title) === undefined) {
        return res.status(404).json({ error: 'Insira um título.' })
    }

    if (!topics ||typeof(topics) === undefined) {
        return res.status(404).json({ error: 'Insira os tópicos' })
    }

    if (!total_hours || typeof(total_hours) === undefined) {
        return res.status(404).json({ error: 'Insira as horas.' })
    }

    if (!created_by || typeof(created_by) === undefined) {
        return res.status(404).json({ error: 'Insira um criador.' })
    }

    if (!svg || typeof(svg) === undefined) {
        return res.status(404).json({ error: 'Insira um svg.' })
    }
    if (!status || typeof(status) === undefined) {
        return res.status(404).json({ error: 'Insira a conclusão do curso.' })
    }
    const file = req.file;

    if (!file || typeof(file) ==='undefined') {
        return res.status(400).json({error: 'Nenhuma imagem enviada.'});
    }

    const base64Image = file.buffer.toString('base64')

    await Courses.create({ title, certificate: base64Image, topics, status, total_hours, svg, created_by })

            return  res.json({success: 'Certificado adicionado. '})
 }

export const GetCourses = async (req: Request, res: Response) => {
    try{
        let courses = await Courses.findAll()
        return res.json({ courses });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: 'Erro ao obter cursos.' });
    }
}

export const GetCourse = async (req: Request, res: Response) => {
    const {id} = req.body

    if(!id || typeof(id) === undefined ){
        return res.json({ error: 'Insira um id válido.' });
    }

    try{
        let course = await Courses.findOne({where:{id}})
        if(!course || typeof(course) === undefined){
            return  res.json({ error: 'Projeto não encontrado.' });
        }
        return res.json({ course });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: 'Erro ao obter curso.' });
    }
}

// export const Register = async (req: Request, res: Response) => {
//     const { name, email, password, confirmpassword } = req.body
//     if (!email) {
//         return res.status(422).json({ error: 'Insira um email.' })
//     }
//     if (!name) {
//         return res.status(422).json({ error: 'Insira um nome.' })
//     }

//     if (!password) {
//         return res.status(422).json({ error: 'Insira uma senha.' })
//     }
//     if (!confirmpassword) {
//         return res.status(422).json({ error: 'Confirme sua senha.' })
//     }
//     if (password !== confirmpassword) {
//         return res.status(422).json({ error: 'As senhas devem ser iguais.' })
//     }

//     // Verificar se o email já existe no banco
//     const userSearch = await User.findAll({ where: {email} })
//     if (userSearch.length > 0) {
//         return res.status(422).json({ error: 'Este email já está sendo utilizado.' })
//     }

//     //Criar senha
//     const salt = await bcrypt.genSalt(12)
//     const passwordHash = await bcrypt.hash(password, salt)

//     //Criar usuário

//     try {
//         // await user.save()
//         // res.status(201).json({sucess: 'Usuário criado.'})

//         const newUser = await User.create({
//             name,
//             email,
//             passwordHash

//         });
//         res.status(201).json({ success: 'Usuário criado.' });
//     } catch(e){
//         console.log(e)
//         res.status(500).json({error: 'Erro interno, tente novamente mais tarde.'})
//     }
// }


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
const file = req.file
const resizedImageBuffer = await sharp(file.buffer).resize(500, 500).toBuffer();
const filename = `${Date.now()}_${file.originalname}`;

// const fileUpload = storageBucket.file(filename);

// const blobStream = fileUpload.createWriteStream({
// metadata: {
//     contentType: file.mimetype,
// },
// });

const errors: any = [];

// blobStream.on('error', (err) => {
// errors.push(err)
// });

// blobStream.on('finish', async () => {
// if(errors.length > 0 ){
//     return res.status(400).json({ error: errors })
// }

await Projects.update({ tech, deploy, desc, git, title, img: filename}, {
    where: {id}
})

// blobStream.end(resizedImageBuffer);
return res.json({sucess: 'Projeto atualizado.'})
} else {
await Projects.update({ tech, deploy, desc, git, title}, {where: {id}})
return res.json({sucess: 'Projeto atualizado. Imagem mantida.'})
}
}

export const CreateProject =  async (req: Request, res: Response) => {
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

try{
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
      }

      const resizedImageBuffer = await sharp(req.file.buffer)
      .resize({ width: 500, height: 500 })
      .toBuffer();

      const resizedImageBase64 = resizedImageBuffer.toString('base64');

      await Projects.create({
        title, git, desc, deploy, img: resizedImageBase64  ,tech
        })

     return res.status(200).json({ sucess: 'Projecto adicionado com sucesso'});

} catch (err){
    console.error('Erro ao fazer upload da imagem:', err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
}

}

export const ValidateToken = async (req: Request, res: Response) => {
    const {token} = req.body
    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY as string)
        const {id} = decoded as jwt.JwtPayload
        const user = await User.findOne({where:{id}})
        console.log(decoded)
        console.log(user)

        return res.json({user})
    }catch(err){
        return res.status(400).json({err: 'Acesso negado(2).'})
    }
}
