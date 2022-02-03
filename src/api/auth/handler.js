import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../../model/user.js';
import BaseHandler from '../default.js';
import Logs from '../../model/log.js';
import { JWT_SECRET } from '../../config/index.js';

const user = new Users();
const authLog = new Logs();

export default class AuthHandler extends BaseHandler {
  async loginHandler(req, res, _next) {
    try {
      const { username, password } = req.body;
      const checkUsername = await user.getUsername(username);
      if (!checkUsername) {
        return super.render(res, 400, {
          status: 'error',
          message: 'Username tidak ditemukan!'
        });
      }

      const match = await bcrypt.compare(password, checkUsername.password);
      if (!match) {
        return super.render(res, 400, {
          status: 'error',
          message: 'Passwor salah!'
        });
      }

      const checkLog = await authLog.cekMasuk(checkUsername.siswa);
      if (checkLog.length) {
        return super.render(res, 400, {
          status: 'error',
          message: `${username} sudah login!`
        });
      }

      await authLog.masuk(checkUsername.siswa);

      const payload = {
        user: checkUsername.siswa,
        role: checkUsername.role
      };
      console.log(JWT_SECRET);
      const token = jwt.sign(payload, JWT_SECRET);
      return super.render(res, 200, {
        status: 'success',
        message: 'Login berhasil!',
        token
      });
    } catch (error) {
      console.log(error);
      return super.render(res, 500, {
        status: 'error',
        message: 'Mohon maaf, kesalahan server!'
      });
    }
  }

  async resetHandler(req, res, _next) {
    try {
      const siswa = req.params.siswa;
      const reset = await authLog.keluar(siswa);
      console.log(reset);
      return super.render(res, 200, {
        status: 'success',
        message: 'Siswa berhasil keluar!'
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
