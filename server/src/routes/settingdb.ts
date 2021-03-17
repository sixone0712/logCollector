import { NextFunction, Request, Response } from 'express';
import express = require('express');
import { getConnection, getManager } from 'typeorm';
import { SettingDB } from '../entity/SettingDB';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // get a post repository to perform operations with post
  const postRepository = getManager().getRepository(SettingDB);

  // load a post by a given post id
  const posts = await postRepository.find();

  // return loaded posts
  res.send(posts);
});

export default router;
