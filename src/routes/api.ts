import { Router } from 'express';
import { Auth } from '../middlewares/auth';

import * as ApiController from '../controllers/ApiController';

const router = Router();

router.get('/projects', ApiController.GetProjects);
router.post('/register', ApiController.Register)
router.post('/login', ApiController.Login)

export default router;