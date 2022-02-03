import Pengumumans from '../../model/pengumuman.js';
import BaseHandler from '../default.js';

const pengumuman = new Pengumumans();

export default class PengumumanHandler extends BaseHandler {
  async getHandler(_req, res, _next) {
    try {
      const data = await pengumuman.getAll();

      return super.render(res, 200, {
        status: 'success',
        message: 'Pengumuman berhasail dirender!',
        data
      });
    } catch (error) {
      console.log(error);
      return super.render(res, 500, {
        status: 'error',
        message: 'Mohon maaf, kesalahan server!'
      });
    }
  }

  async getByKelasHandler(req, res, _next) {
    try {
      const kelas = req.params.kelas;
      const data = await pengumuman.getByKelas(kelas);

      return super.render(res, 200, {
        status: 'success',
        message: 'Pengumuman berhasail dirender!',
        data
      });
    } catch (error) {
      console.log(error);
      return super.render(res, 500, {
        status: 'error',
        message: 'Mohon maaf, kesalahan server!'
      });
    }
  }

  async postHandler(req, res, _next) {
    try {
      const { judul, isi, kelas } = req.body;

      const data = await pengumuman.simpan(judul, isi, kelas);
      if (!data) {
        return super.render(res, 400, {
          status: 'error',
          message: 'Gagal membuat pengumuman!'
        });
      }

      return super.render(res, 200, {
        status: 'success',
        message: 'Berhasil membuat pengumuman!'
      });
    } catch (error) {
      console.log(error);
      return super.render(res, 500, {
        status: 'error',
        message: 'Mohon maaf, kesalahan server!'
      });
    }
  }

  async deleteHandler(req, res, _next) {
    try {
      const _id = req.params._id;
      const checkPengumuman = await pengumuman.getById(_id);
      if (!checkPengumuman) {
        return super.render(res, 400, {
          status: 'error',
          message: 'Pengumuman tidak ditemukan!'
        });
      }

      await pengumuman.hapus(_id);

      return super.render(res, 200, {
        status: 'success',
        message: 'Pengumuman berhasail dihapus!'
      });
    } catch (error) {
      console.log(error);
      return super.render(res, 500, {
        status: 'error',
        message: 'Mohon maaf, kesalahan server!'
      });
    }
  }
}
