import { Router } from 'express';
import root from '../api/root/index.js';
import sekolah from '../api/sekolah/index.js';

const router = Router();
router.use('/sekolah', sekolah);
router.use('/', root);

export default router;
