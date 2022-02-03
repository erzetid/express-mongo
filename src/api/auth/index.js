import { Router } from 'express';
import AuthHandler from './handler.js';
const authHandler = new AuthHandler();
const router = Router();

router.post('/', authHandler.loginHandler);
router.delete('/:siswa', authHandler.resetHandler);

export default router;
