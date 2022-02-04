import Soals from '../../model/soal.js';
import BaseHandler from '../default.js';

const soal = new Soals();

export default class SoalHandler extends BaseHandler {
  async getHandler(_req, res, _next) {
    try {
      const _data = await soal.getAll();
      const data = _data.map((item) => {
        return {
          _id: item._id,
          nama: item.nama,
          jumlah: item.jumlah,
          diperbarui: item.diperbarui
        };
      });

      return super.render(res, 200, {
        status: 'success',
        message: 'Data soal berhasil dirender!',
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
      const { nama, jumlah, jumlahOpsi } = req.body;

      await soal.simpan(nama, jumlah, jumlahOpsi);
      return super.render(res, 201, {
        status: 'success',
        message: 'Soal berhasil disimpan!'
      });
    } catch (error) {
      console.log(error);
      return super.render(res, 500, {
        status: 'error',
        message: 'Mohon maaf, kesalahan server!'
      });
    }
  }

  async getByIdhandler(req, res, _next) {
    try {
      const _id = req.params._id;
      const data = await soal.getById(_id);
      if (!data) {
        return super.render(res, 400, {
          status: 'error',
          message: 'Soal tidak ditemukan!'
        });
      }
      return super.render(res, 200, {
        status: 'success',
        message: 'Siswa berhasil dihapus!',
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

  async deleteHandler(req, res, _next) {
    try {
      const _id = req.params._id;
      const checkSoal = await soal.getById(_id);
      if (!checkSoal) {
        return super.render(res, 400, {
          status: 'error',
          message: 'Soal tidak ditemukan!'
        });
      }
      await soal.hapus(_id);
      return super.render(res, 200, {
        status: 'success',
        message: 'Soal berhasil dihapus!'
      });
    } catch (error) {
      console.log(error);
      return super.render(res, 500, {
        status: 'error',
        message: 'Mohon maaf, kesalahan server!'
      });
    }
  }
  async editButirSoal(req, res, _next) {
    try {
      const { _id: idButir, soal: isiSoal, jawaban, opsi } = req.body;
      await soal.editButirSoal(idButir, isiSoal);
      await soal.editJawabanSoal(idButir, jawaban);
      const data = await Promise.all(
        opsi.map(async (item) => {
          const { opsi, _id } = item;
          await soal.editOpsi(_id, opsi);

          return { _id, opsi };
        })
      );

      console.log(data);
      return super.render(res, 200, {
        status: 'success',
        message: 'Soal berhasil disimpan!'
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
