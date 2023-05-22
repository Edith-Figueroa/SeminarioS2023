import express from 'express';
const router  = express.Router();
import projectsRouter from './projects';
import securitysRouter from './security';

router.use('/projects', projectsRouter);
router.use('/security', securitysRouter);

export default router;
