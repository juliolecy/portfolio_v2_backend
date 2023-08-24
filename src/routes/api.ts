import { Router } from 'express';
import { Auth } from '../middlewares/auth';
import multer from 'multer'

// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, './tmp')
//     },
//     filename: (req, file, cb)=>{
//         cb(null, `${file.fieldname+Date.now()}.jpg`)
//     }
// })

const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, cb)=>{
        const allowed: string[] = ['image/jpeg', 'image/jpg', 'image/png'];

        cb(null,  allowed.includes(file.mimetype))
    },
    limits: {
        fieldSize: 3000000 } // 3 mb
})

import * as ApiController from '../controllers/ApiController';
import checkToken from '../middlewares/checkToken';

const router = Router();

router.get('/projects', ApiController.GetProjects);
router.post('/register', ApiController.Register)
router.post('/login', ApiController.Login)
router.post('/project', ApiController.GetProject)


router.post('/project/create', checkToken, upload.single('img'), ApiController.CreateProject)

router.post('/project/edit', checkToken, upload.single('img'), ApiController.EditProject)


export default router;