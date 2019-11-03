const { Lesson, validateLesson } = require('../models');

const readLessons = async (req, res) => {
  const lessons = await Lesson.find();
  res.send(lessons);
};

const readLesson = async (req, res) => {
  const lesson = await Lesson.findOne({ slug: req.params.slug });
  res.send(lesson);
};

const createLesson = async (req, res) => {
  const { error } = validateLesson(req.body);
  if (error) return res.status(400).send(error);

  const lesson = new Lesson({
    title: req.body.title,
    description: req.body.description,
    programs: req.body.programs,
    published: req.body.published,
    content: req.body.content,
  });

  await lesson.save();
  return res.status(201).send(lesson);
};

const updateLesson = async (req, res) => {
  const { error } = validateLesson(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const lesson = await Lesson.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
  });
  if (!lesson) return res.status(404).send('Lesson with given ID not found.');

  return res.send(lesson);
};

const deleteLesson = async (req, res) => {
  const lesson = Lesson.findByIdAndRemove(req.params.id);
  if (!lesson) return res.status(404).send('Lesson with the given ID not found.');
  return res.send(lesson);
};

module.exports = {
  readLessons,
  readLesson,
  createLesson,
  updateLesson,
  deleteLesson,
};
