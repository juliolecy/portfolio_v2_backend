import { Router } from 'express';
import { Auth } from '../middlewares/auth';
import multer from 'multer'
import * as ApiController from '../controllers/ApiController';
import checkToken from '../middlewares/checkToken';

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb)=>{
        const allowed: string[] = ['image/jpeg', 'image/jpg', 'image/png'];

        cb(null,  allowed.includes(file.mimetype))
    },
    limits: {
        fieldSize:  5 * 1024 * 1024 } // 5 mb
})

const router = Router();

router.post('/ping', ApiController.ping)

router.post('/project', ApiController.GetProject)
router.get('/projects', ApiController.GetProjects);
router.get('/courses', ApiController.GetCourses);
router.post('/addcourse',checkToken,upload.single('certificate'), ApiController.AddCourse);
router.post('/login', ApiController.Login)
router.post('/addproject', checkToken, upload.single('img'), ApiController.CreateProject);
router.post('/project/edit', checkToken, upload.single('img'), ApiController.EditProject)
router.post('/validatetoken', ApiController.ValidateToken)


export default router;