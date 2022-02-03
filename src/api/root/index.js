import { Router } from 'express';
import RootHandler from './handler.js';

const rootHandler = new RootHandler();

const router = Router();

router.get('/', rootHandler.getHandler);
router.use('*', rootHandler.notFoundHandler);

export default router;
