import { Router } from 'express';
import { Auth } from '../middlewares/auth';

import * as ApiController from '../controllers/apiController';

const router = Router();

router.get('/projects', ApiController.getProjects);


export default router;