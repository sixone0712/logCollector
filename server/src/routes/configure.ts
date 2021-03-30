import { NextFunction, Request, Response } from 'express';
import { createQueryBuilder, getManager } from 'typeorm';
import { Job } from '../entity/Job';
import { JobHistory } from '../entity/JobHistory';
import { JobNotification } from '../entity/JobNotification';
import { JobStatus } from '../entity/JobStatus';
import { MailContext } from '../entity/MailContext';
import { SettingDB } from '../entity/SettingDB';
import { Site } from '../entity/Site';
import { User } from '../entity/User';
import sleep from '../utils/sleep';
import express = require('express');

const router = express.Router();

router.get('/sites', async (req: Request, res: Response, next: NextFunction) => {
  // get a post repository to perform operations with post
  const sitesRepository = getManager().getRepository(Site);
  // load a post by a given post id
  const sites = await sitesRepository.find();
  await sleep(1000);
  // return loaded posts
  res.send(sites);
});

router.get('/sites/names', async (req: Request, res: Response, next: NextFunction) => {
  // get a post repository to perform operations with post
  const sitesRepository = getManager().getRepository(Site);
  // load a post by a given post id
  const sites = await sitesRepository.find();

  const names = sites.map((item) => ({
    id: item.id,
    siteName: item.siteName,
    fabName: item.fabName,
  }));
  // return loaded posts...
  await sleep(1000);
  res.send(names);
});

router.get('/host', async (req: Request, res: Response, next: NextFunction) => {
  const db = await createQueryBuilder<SettingDB>('setting_db').getOne();

  console.log('db', db);

  await sleep(1000);

  if (db) {
    res.send({
      address: db.address,
      port: db.port,
      user: db.user,
      password: db.password,
    });
  } else {
    res.send({
      address: '',
      port: 0,
      user: '',
      password: '',
    });
  }
});

router.post('/host', async (req: Request, res: Response, next: NextFunction) => {
  console.log('req.body', req.body);

  const db = await createQueryBuilder<SettingDB>('setting_db')
    .update(SettingDB)
    .set({ ...req.body })
    .execute();

  res.send('ok');
});

export default router;
