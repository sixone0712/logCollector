import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Job } from '../entity/Job';
import express = require('express');
import sleep from '../utils/sleep';

const router = express.Router();
router.get('/remote/joblist', async (req: Request, res: Response, next: NextFunction) => {
  const job = await getManager().getRepository(Job);

  const foundJob = await job.find({
    // relations: ['site_id', 'collect_status', 'error_summary_status', 'cras_status', 'version_check_status', 'owner'],
    relations: ['site_id', 'collect_status', 'error_summary_status', 'cras_status', 'version_check_status'],
    where: { job_type: 'remote' },
  });

  const response = foundJob.map((item, idx) => ({
    index: idx,
    id: item.id,
    stop: item.stop,
    site_name: item.site_id.site_name,
    collect_status: item.collect_status.status,
    error_summary_status: item.error_summary_status.status,
    cras_status: item.cras_status.status,
    version_check_status: item.version_check_status.status,
  }));

  await sleep(3000);

  res.json(response);
});

export default router;
