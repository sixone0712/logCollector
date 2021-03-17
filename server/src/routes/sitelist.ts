import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import { SiteList } from '../entity/SiteList';
import express = require('express');

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // get a post repository to perform operations with post
  const postRepository = getManager().getRepository(SiteList);

  // load a post by a given post id
  const posts = await postRepository.find();

  console.log(posts);

  // return loaded posts
  res.send(posts);
});

export default router;