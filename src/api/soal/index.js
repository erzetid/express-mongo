import { Router } from 'express';
import SoalHandler from './handler.js';

const soalHandler = new SoalHandler();
const router = Router();

router.get('/', soalHandler.getHandler);
router.get('/:_id', soalHandler.getByIdhandler);
router.post('/', soalHandler.postHandler);
router.put('/butir', soalHandler.editButirSoal);
router.delete('/:_id', soalHandler.deleteHandler);

export default router;
