import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  siswa: String,
  status: String,
  diperbarui: Date
});

const logService = mongoose.model('logs', logSchema);

export default class Logs {
  service = logService;

  async masuk(siswa) {
    const logBaru = new this.service({ siswa, status: 'login' });
    const query = await logBaru.save();

    return query;
  }

  async cekMasuk(siswa) {
    const query = await this.service.find({ siswa, status: 'login' });

    return query;
  }

  async keluar(siswa) {
    const query = await this.service.updateMany(
      { siswa },
      { $set: { status: 'logout' } }
    );

    return query;
  }
}
