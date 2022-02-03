import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import Database from './database/index.js';
import { MONGO_URI } from './config/index.js';

export default class Server {
  app = express();
  database = new Database(MONGO_URI);

  constructor(port) {
    this.port = port;
    this.middelwares();
    this.routes();
    this.database.connect();
  }

  middelwares() {
    this.app.use(cors());
    this.app.disable('x-powered-by');
    this.app.use(express.json());
    this.app.use((_req, _res, next) => {
      return next();
    });
  }

  listen() {
    return this.app.listen(this.port, () =>
      console.log(`server run on http://localhost:${this.port}`)
    );
  }

  routes() {
    this.app.use('/', router);
  }
}
