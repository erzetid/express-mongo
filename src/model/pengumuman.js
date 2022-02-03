import mongoose from 'mongoose';

const pengumumanSchema = new mongoose.Schema({
  judul: String,
  isi: String,
  kelas: String,
  diperbarui: Date
});

const pengumumanService = mongoose.model('pengumumans', pengumumanSchema);

export default class Pengumumans {
  service = pengumumanService;

  async simpan(judul, isi, kelas, diperbarui) {
    const pengumumanBaru = new this.service(
      { judul, isi, kelas, diperbarui },
      { new: true }
    );
    const query = await pengumumanBaru.save();

    return query;
  }

  async lihatSemua() {
    const query = await this.service.find();

    return query;
  }

  async edit(_id, data) {
    const query = await this.service.findByIdAndUpdate(
      _id,
      { $set: data },
      { new: true }
    );

    return query;
  }

  async hapus(_id) {
    const query = await this.service.findByIdAndDelete(_id);

    return query;
  }

  async getByKelas(kelas) {
    const query = await this.service.find(
      { kelas },
      { $sort: { diperbarui: 'desc' } }
    );

    return query;
  }
}
