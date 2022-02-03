import { Router } from 'express';
import SekolahHandler from './handler.js';

const sekolahHandler = new SekolahHandler();

const router = Router();

router.get('/', sekolahHandler.getHandler);
router.put('/', sekolahHandler.putHandler);

export default router;
