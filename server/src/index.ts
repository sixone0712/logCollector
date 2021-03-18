import bodyParser = require('body-parser');
import compression = require('compression');
import cors = require('cors');
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import morgan = require('morgan');
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import settingdb from './routes/settingdb';
import sitelist from './routes/sitelist';

// Connect typeORM mysql
createConnection()
  .then(() => {
    console.log('Database Connected :)');
    const app = express();

    // middlewares
    app.set('port', process.env.PORT || 3001);
    app.use(compression());
    app.use(bodyParser.json());
    app.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );
    app.use(morgan('dev'));
    // app.use(
    //   cors({
    //     origin: [`${process.env.TEST_IP}`],
    //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //     credentials: true,
    //   })
    // );

    app.use('/api/sitelist', sitelist);
    app.get('/test', async (req: Request, res: Response, next: NextFunction) => {
      console.log('test');
      res.end('1234');
    });

    app.listen(3001, () => console.log(`BillyZip App Listening on PORT 3001`));
  })
  .catch((error) => console.log(error));

// Create express server

// Routes

// app.use('/houses', housesRouter);
// app.use('/favs', favsRouter);
// app.use('/application', applicationRouter);
// app.use('/payment', paymentRouter);
// app.use('/auth', authRouter);
// app.use('/forum', forumRouter);
