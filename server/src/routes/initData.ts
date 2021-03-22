import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import express = require('express');
import { User } from '../entity/User';
import { Site } from '../entity/Site';
import { Job } from '../entity/Job';
import { JobStatus } from '../entity/JobStatus';

const router = express.Router();

router.get('/db', async (req: Request, res: Response, next: NextFunction) => {
  const userManager = await getManager().getRepository(User);
  for (let i = 0; i < 30; i++) {
    const testUser = new User();
    testUser.name = `chpark_${i}`;
    testUser.password = 'password';
    testUser.created = new Date();
    testUser.last_access = new Date();
    testUser.permission = ['status', 'configure', 'rules', 'account'];
    await userManager.save(testUser);
  }

  const siteManager = await getManager().getRepository(Site);
  for (let i = 0; i < 30; i++) {
    const newSite = new Site();
    newSite.site_name = `siteName${i}`;
    newSite.fab_name = `fabName_${i}`;
    newSite.address = `10.1.31.${i}`;
    newSite.user = `chpark_${i}`;
    newSite.password = 'password';
    newSite.port = 80;
    newSite.password = 'password';
    newSite.db_address = `192.168.0.${i}`;
    newSite.db_port = 5432;
    newSite.db_password = 'password';
    newSite.mpa_count = i;
    await siteManager.save(newSite);
  }

  res.json('ok');
});

router.get('/job', async (req: Request, res: Response, next: NextFunction) => {
  // const userManager = await getManager().getRepository(User);
  // for (let i = 0; i < 30; i++) {
  //   const testUser = new User();
  //   testUser.name = `chpark_${i}`;
  //   testUser.password = 'password';
  //   testUser.created = new Date();
  //   testUser.last_access = new Date();
  //   testUser.permission = ['status', 'configure', 'rules', 'account'];
  //   await userManager.save(testUser);
  // }

  // const siteManager = await getManager().getRepository(Site);
  // for (let i = 0; i < 30; i++) {
  //   const newSite = new Site();
  //   newSite.site_name = `siteName${i}`;
  //   newSite.fab_name = `fabName_${i}`;
  //   newSite.address = `10.1.31.${i}`;
  //   newSite.user = `chpark_${i}`;
  //   newSite.password = 'password';
  //   newSite.port = 80;
  //   newSite.password = 'password';
  //   newSite.db_address = `192.168.0.${i}`;
  //   newSite.db_port = 5432;
  //   newSite.db_password = 'password';
  //   newSite.mpa_count = i;
  //   await siteManager.save(newSite);
  // }

  for (let i = 0; i < 30; i++) {
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

    const ownerUser = await getManager()
      .getRepository(User)
      .findOne(i + 1);
    const site = await getManager()
      .getRepository(Site)
      .findOne(i + 1);

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
    job.file_path = `/test/filepath/remote/${i + 1}`;
    await getManager().getRepository(Job).save(job);
  }

  for (let i = 0; i < 30; i++) {
    const job = new Job();
    const collectStatus = new JobStatus();
    const errorStatus = new JobStatus();
    const crasStatus = new JobStatus();
    const version = new JobStatus();

    collectStatus.full_string = 'collect_jobStatus';
    collectStatus.status = 'processing';
    collectStatus.represent_string = 'collect_jobStatus';
    await getManager().getRepository(JobStatus).save(collectStatus);

    const ownerUser = await getManager()
      .getRepository(User)
      .findOne(i + 1);
    const site = await getManager()
      .getRepository(Site)
      .findOne(i + 1);

    job.site_id = site;
    job.collect_status = collectStatus;
    job.stop = false;
    job.owner = ownerUser;
    job.created = new Date();
    job.last_action = new Date();
    job.job_type = 'local';
    job.file_path = `/test/filepath/local/${i + 1}`;
    await getManager().getRepository(Job).save(job);
  }

  res.json('ok');
});

export default router;
