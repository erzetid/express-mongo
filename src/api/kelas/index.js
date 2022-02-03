import { Router } from 'express';
import KelasHandler from './handler.js';

const kelasHandler = new KelasHandler();

const router = Router();

router.get('/', kelasHandler.getHandler);
router.post('/', kelasHandler.postHandler);
router.put('/', kelasHandler.putHandler);

export default router;
