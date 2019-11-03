const { Post, validatePost } = require('../models');

const readPosts = async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
};

const readPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  res.send(post);
};

const createPost = async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error);

  const post = new Post({
    title: req.body.title,
    thumbnailUrl: req.body.thumbnailUrl,
    content: req.body.content,
  });

  await post.save();
  return res.status(201).send(post);
};

const updatePost = async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = await Post.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    thumbnailUrl: req.body.thumbnailUrl,
    content: req.body.content,
  });
  if (!post) return res.status(404).send('Post with given ID not found.');
  return res.send(post);
};

const deletePost = async (req, res) => {
  const post = await Post.findByIdAndRemove(req.params.id);
  if (!post) return res.status(404).send('Post with given ID not found.');
  return res.send(post);
};

module.exports = {
  readPosts,
  readPost,
  createPost,
  updatePost,
  deletePost,
};
