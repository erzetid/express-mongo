import { Router } from 'express';
import PengumumanHandler from './handler.js';

const pengumumanHandler = new PengumumanHandler();

const router = Router();

router.get('/', pengumumanHandler.getHandler);
router.get('/:kelas', pengumumanHandler.getByKelasHandler);
router.post('/', pengumumanHandler.postHandler);
router.delete('/:_id', pengumumanHandler.deleteHandler);

export default router;
