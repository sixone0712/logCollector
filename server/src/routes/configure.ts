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

router.get('/site', async (req: Request, res: Response, next: NextFunction) => {
  // get a post repository to perform operations with post
  const postRepository = getManager().getRepository(Site);
  // load a post by a given post id
  const posts = await postRepository.find();
  console.log(posts);
  await sleep(1000);

  // return loaded posts
  res.send(posts);
});

router.get('/setting', async (req: Request, res: Response, next: NextFunction) => {
  const postRepository = getManager().getRepository(SettingDB);
  const posts = await postRepository.find();
  res.send(posts);
});

router.get('/insert', async (req: Request, res: Response, next: NextFunction) => {
  // get a post repository to perform operations with post

  const job = new Job();
  const collectStatus = new JobStatus();
  const errorStatus = new JobStatus();
  const crasStatus = new JobStatus();
  const version = new JobStatus();

  collectStatus.full_string = 'collect_jobStatus';
  collectStatus.status = 'processing';
  collectStatus.represent_string = 'collect_jobStatus';
  await getManager().getRepository(JobStatus).save(collectStatus);
  errorStatus.full_string = 'cras_jobStatus';
  errorStatus.status = 'processing';
  errorStatus.represent_string = 'cras_jobStatus';
  await getManager().getRepository(JobStatus).save(errorStatus);
  crasStatus.full_string = 'cras_jobStatus';
  crasStatus.status = 'processing';
  crasStatus.represent_string = 'cras_jobStatus';
  await getManager().getRepository(JobStatus).save(crasStatus);
  version.full_string = 'version_jobStatus';
  version.status = 'processing';
  version.represent_string = 'version_jobStatus';
  await getManager().getRepository(JobStatus).save(version);

  const ownerUser = await getManager().getRepository(User).findOne(1);

  const site = await getManager().getRepository(Site).findOne(1);
  job.site_id = site;
  job.collect_status = collectStatus;
  job.error_summary_status = errorStatus;
  job.cras_status = crasStatus;
  job.version_check_status = version;
  job.stop = false;
  job.owner = ownerUser;
  job.created = new Date();
  job.last_action = new Date();
  job.job_type = 'remote';
  job.file_path = '/test/filepath';
  await getManager().getRepository(Job).save(job);

  res.json('ok');
});

export default router;
