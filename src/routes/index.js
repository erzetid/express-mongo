import { Router } from 'express';
import root from '../api/root/index.js';
import sekolah from '../api/sekolah/index.js';
import siswa from '../api/siswa/index.js';
import pengumuman from '../api/pengumuman/index.js';
import auth from '../api/auth/index.js';
import kelas from '../api/kelas/index.js';

const router = Router();
router.use('/auth', auth);
router.use('/sekolah', sekolah);
router.use('/kelas', kelas);
router.use('/siswa', siswa);
router.use('/pengumuman', pengumuman);
router.use('/', root);

export default router;
