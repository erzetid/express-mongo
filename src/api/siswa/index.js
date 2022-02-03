import { Router } from 'express';
import Siswahandler from './handler.js';

const siswahandler = new Siswahandler();

const router = Router();

router.get('/', siswahandler.getHandler);
router.get('/:_id', siswahandler.getByIdHandler);
router.post('/', siswahandler.postHandler);
router.put('/', siswahandler.putHandler);
router.delete('/:_id', siswahandler.deleteHandler);

export default router;
