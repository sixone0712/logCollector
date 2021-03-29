import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import express = require('express');
import { User } from '../entity/User';
import { Site } from '../entity/Site';
import { Job } from '../entity/Job';
import { JobStatus } from '../entity/JobStatus';
import { JobNotification } from '../entity/JobNotification';
import { MailContext } from '../entity/MailContext';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/db', async (req: Request, res: Response, next: NextFunction) => {
  const userManager = await getManager().getRepository(User);
  for (let i = 0; i < 30; i++) {
    const testUser = new User();
    testUser.name = `chpark_${i}`;
    testUser.password = 'password';
    testUser.created = new Date();
    testUser.lastAccess = new Date();
    testUser.permission = ['status', 'configure', 'rules', 'account'];
    await userManager.save(testUser);
  }

  const siteManager = await getManager().getRepository(Site);
  for (let i = 0; i < 30; i++) {
    const newSite = new Site();
    newSite.siteName = `siteName${i}`;
    newSite.fabName = `fabName_${i}`;
    newSite.address = `10.1.31.${i}`;
    newSite.user = `chpark_${i}`;
    newSite.password = 'password';
    newSite.port = 80;
    newSite.password = 'password';
    newSite.dbAddress = `192.168.0.${i}`;
    newSite.dbPort = 5432;
    newSite.dbPassword = 'password';
    newSite.excuteMpas = [2, 4, 6, 8];
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
  //   testUser.lastAccess = new Date();
  //   testUser.permission = ['status', 'configure', 'rules', 'account'];
  //   await userManager.save(testUser);
  // }

  // const siteManager = await getManager().getRepository(Site);
  // for (let i = 0; i < 30; i++) {
  //   const newSite = new Site();
  //   newSite.siteName = `siteName${i}`;
  //   newSite.fabName = `fabName_${i}`;
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
    const notification = new JobNotification();

    collectStatus.fullString = 'collect_jobStatus';
    collectStatus.status = 'processing';
    collectStatus.representString = 'collect_jobStatus';
    await getManager().getRepository(JobStatus).save(collectStatus);
    errorStatus.fullString = 'cras_jobStatus';
    errorStatus.status = 'processing';
    errorStatus.representString = 'cras_jobStatus';
    await getManager().getRepository(JobStatus).save(errorStatus);
    crasStatus.fullString = 'cras_jobStatus';
    crasStatus.status = 'processing';
    crasStatus.representString = 'cras_jobStatus';
    await getManager().getRepository(JobStatus).save(crasStatus);
    version.fullString = 'version_jobStatus';
    version.status = 'processing';
    version.representString = 'version_jobStatus';
    await getManager().getRepository(JobStatus).save(version);

    const ownerUser = await getManager()
      .getRepository(User)
      .findOne(i + 1);
    const site = await getManager()
      .getRepository(Site)
      .findOne(i + 1);

    job.siteId = site;
    job.collectStatus = collectStatus;
    job.errorSummaryStatus = errorStatus;
    job.crasDataStatus = crasStatus;
    job.mpaVersionStatus = version;
    job.stop = false;
    job.owner = ownerUser;
    job.created = new Date();
    job.lastAction = new Date();
    job.jobType = 'remote';

    notification.isErrorSummary = true;
    const errorSummaryEmail = new MailContext();
    errorSummaryEmail.recipients = ['chpark@canon.bs.co.kr', 'chpark2@canon.bs.co.kr'];
    errorSummaryEmail.subject = 'hello? errorSummaryEmail';
    errorSummaryEmail.body = 'this is body?';
    await getManager().getRepository(MailContext).save(errorSummaryEmail);
    notification.errorSummaryEmail = errorSummaryEmail;

    notification.isCrasData = true;
    const crasDataEmail = new MailContext();
    crasDataEmail.recipients = ['chpark@canon.bs.co.kr', 'chpark2@canon.bs.co.kr'];
    crasDataEmail.subject = 'hello? crasDataEmail';
    crasDataEmail.body = 'this is body?';
    await getManager().getRepository(MailContext).save(crasDataEmail);
    notification.crasDataEmail = crasDataEmail;

    notification.isMpaVersion = true;
    const mpaVersionEmail = new MailContext();
    mpaVersionEmail.recipients = ['chpark@canon.bs.co.kr', 'chpark2@canon.bs.co.kr'];
    mpaVersionEmail.subject = 'hello? version_email';
    mpaVersionEmail.body = 'this is body?';
    await getManager().getRepository(MailContext).save(mpaVersionEmail);
    notification.mpaVersionEmail = mpaVersionEmail;

    notification.sending_times = ['11:00', '23:00'];
    notification.before = 60 * 60 * 24;

    await getManager().getRepository(JobNotification).save(notification);
    job.notification = notification;
    job.planids = [2, 4, 6, 8];
    await getManager().getRepository(Job).save(job);
  }

  for (let i = 0; i < 30; i++) {
    const job = new Job();
    const collectStatus = new JobStatus();

    collectStatus.fullString = 'collect_jobStatus';
    collectStatus.status = 'processing';
    collectStatus.representString = 'collect_jobStatus';
    await getManager().getRepository(JobStatus).save(collectStatus);

    const ownerUser = await getManager()
      .getRepository(User)
      .findOne(i + 1);
    const site = await getManager()
      .getRepository(Site)
      .findOne(i + 1);

    job.siteId = site;
    job.collectStatus = collectStatus;
    job.stop = false;
    job.owner = ownerUser;
    job.created = new Date();
    job.lastAction = new Date();
    job.jobType = 'local';

    const max = Math.random() * (10 - 1) * 1;
    const fileNames = [];
    const fileIds = [];
    for (let j = 0; j < max; j++) {
      fileNames.push(`${generateString(16)}.zip`);
      fileIds.push(Math.floor(Math.random() * (999999 - 1) * 1));
    }
    job.fileNames = fileNames;
    job.fileIds = fileIds;

    await getManager().getRepository(Job).save(job);
  }

  res.json('ok');
});

function generateString(bit) {
  const random_str = Math.random().toString(bit).substring(2, 15) + Math.random().toString(bit).substring(2, 15);
  return random_str;
}

export default router;
