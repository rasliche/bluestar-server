const { Lesson } = require('../models/lesson')

exports.index = async (req, res, next) => {
    const lessons = await Lesson.find().populate('programs')
    res.send(lessons)
}

exports.create = async (req, res, next) => {
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
    const lesson = await Lesson.findById(req.params.id)
    if (!lesson) return res.status(404).send("Lesson with given ID not found.")

    res.send(lesson)
}

exports.update = async (req, res, next) => {
  const lesson = await Lesson.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    programs: req.body.programs,
  }, { new: true })

  if (!lesson) return res.status(404).send("Lesson with given ID not found.")
  res.send(lesson)
}

exports.destroy = async (req, res, next) => {
  const lesson = Lesson.findByIdAndDelete(req.params.id)
  if (!lesson) return res.status(404).send("Lesson with the given ID not found.")
  res.send(lesson)
}
