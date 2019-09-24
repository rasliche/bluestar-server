const mongoose = require('mongoose');
const Joi = require('joi');
const slug = require('slugs');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    default: 'test-slug',
  },
});

postSchema.pre('save', function (next) {
  this.slug = slug(this.title);
  next();
});

function validatePost(post) {
  const schema = {
    title: Joi.string().required(),
    thumbnailUrl: Joi.string().required(),
    content: Joi.string().required(),
  };
  return Joi.validate(post, schema);
}

module.exports.Post = mongoose.model('Post', postSchema);
module.exports.validatePost = validatePost;
