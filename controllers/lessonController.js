const { Lesson, validateLesson } = require('../models/lesson')

exports.index = async (req, res, next) => {
  try {
    const lessons = await Lesson.find().populate('programs')
    res.send(lessons)
  } catch (error) {
    next(error)
  }
}

exports.create = async (req, res, next) => {
  const { error } = validateLesson(req.body)
  if (error) return res.status(400).send(error)

  const lesson = new Lesson({
    title: req.body.title,
    description: req.body.description,
    programs: req.body.programs,
    published: req.body.published,
    content: req.body.content,
  })

  await lesson.save()
  res.status(201).send(lesson)
}

exports.read = async (req, res, next) => {
  const query = Lesson.findById(req.params.id)
  if (req.query.questions === 'true') query.populate('questions')
  if (req.query.programs === 'true') query.populate('programs')
  try {
    const lesson = await query.exec()
    res.send(lesson)
  } catch (error) {
    next(error)
  }
}

exports.update = async (req, res, next) => {
  const { error } = validateLesson(req.body)
  if (error) return res.status(400).send(error)
    
  const lesson = await Lesson.findByIdAndUpdate(req.params.id, {
    // slug: slug(req.body.title),
    title: req.body.title,
    description: req.body.description,
    programs: req.body.programs,
    content: req.body.content,
  }, { new: true })
  if (!lesson) return res.status(404).send("Lesson with given ID not found.")

  res.send(lesson)
}

exports.destroy = async (req, res, next) => {
  const lesson = Lesson.findByIdAndDelete(req.params.id)
  if (!lesson) return res.status(404).send("Lesson with the given ID not found.")
  res.send(lesson)
}
