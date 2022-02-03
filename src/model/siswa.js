import mongoose from 'mongoose';

const siswaSchema = new mongoose.Schema({
  username: String,
  nisn: String,
  nama: String,
  kelas: String
});

const siswaService = mongoose.model('siswas', siswaSchema);

export default class Siswas {
  service = siswaService;

  async simpan(username, nisn, nama, kelas) {
    if (!this.service.getByNisn(nisn)) {
      throw new Error('NISN sudah terdaftar!');
    }
    const siswaBaru = new this.service({ username, nisn, nama, kelas });
    const query = await siswaBaru.save();

    return query;
  }

  async getByNisn(nisn) {
    const query = await this.service.findOne({ nisn });
    return query;
  }

  async editSiswa(_id, data) {
    const query = await this.service.findByIdAndUpdate(
      _id,
      {
        $set: data
      },
      { new: true }
    );

    return query;
  }

  async hapus(_id) {
    const query = await this.service.findByIdAndDelete(_id);
    return query;
  }

  async lihatSemua() {
    const query = await this.service.find();

    return query;
  }
}
