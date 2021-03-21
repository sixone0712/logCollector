import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import express = require('express');
import sleep from '../utils/sleep';

const router = express.Router();

router.get('/plans', async (req: Request, res: Response, next: NextFunction) => {
  // get a post repository to perform operations with post
});

export default router;
