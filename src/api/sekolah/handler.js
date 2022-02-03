import Sekolahs from '../../model/sekolah.js';
import BaseHandler from '../default.js';

const sekolah = new Sekolahs();

export default class SekolahHandler extends BaseHandler {
  async getHandler(_req, res, _next) {
    try {
      const data = await sekolah.getAll();
      if (!data.length) {
        const initial = await sekolah.initial();
        return super.render(res, 201, {
          status: 'success',
          message: 'Initial sekolah berhasail!',
          data: initial
        });
      }
      return super.render(res, 201, {
        status: 'success',
        message: 'Initial sekolah berhasail!',
        data: data[0]
      });
    } catch (error) {
      console.log(error);
      return super.render(res, 500, {
        status: 'error',
        message: 'Mohon maaf, kesalahan server!'
      });
    }
  }

  async putHandler(req, res, _next) {
    try {
      const { _id, data } = req.body;
      const edit = await sekolah.edit(_id, data);

      console.log(edit);
      return super.render(res, 201, {
        status: 'success',
        message: 'Update sekolah berhasail!'
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
