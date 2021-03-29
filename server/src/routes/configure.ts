import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
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
  // return loaded posts
  res.send(names);
});

router.get('/host', async (req: Request, res: Response, next: NextFunction) => {
  const postRepository = getManager().getRepository(SettingDB);
  const posts = await postRepository.find();
  res.send(posts);
});

export default router;
