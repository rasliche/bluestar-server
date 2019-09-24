const express = require('express');
const { Post, validatePost } = require('../models/post');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const posts = await Post.find();
  res.send(posts);
});

router.get('/:slug', async (req, res, next) => {
  const post = await Post.findOne({ slug: req.params.slug });
  res.send(post);
});

router.post('/', async (req, res, next) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error);

  const post = new Post({
    title: req.body.title,
    thumbnailUrl: req.body.thumbnailUrl,
    content: req.body.content,
  });

  await post.save();
  res.status(201).send(post);
});

router.put('/:id', async (req, res, next) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = await Post.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    thumbnailUrl: req.body.thumbnailUrl,
    content: req.body.content,
  });
  if (!post) return res.status(404).send('Post with given ID not found.');
  res.send(post);
});

router.delete('/:id', async (req, res, next) => {
  const post = await Post.findByIdAndRemove(req.params.id);
  if (!post) return res.status(404).send('Post with given ID not found.');
  res.send(post);
});

module.exports = router;
