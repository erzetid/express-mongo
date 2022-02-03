import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String
});

const userService = mongoose.model('users', userSchema);

export default class Users {
  service = userService;

  async simpan(username, password, role) {
    const checkUsername = await this.getUsername(username);
    if (checkUsername) {
      throw new Error('username tidak tersedia!');
    }
    const userBaru = new this.service({ username, password, role });
    const query = await userBaru.save();

    return query;
  }

  async getById(_id) {
    const query = await this.service.findById(_id);

    return query;
  }

  async getAll() {
    const query = await this.service.find();

    return query;
  }

  async edit() {
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

  async getUsername(username) {
    const query = await this.service.findOne({ username });

    return query;
  }
}
