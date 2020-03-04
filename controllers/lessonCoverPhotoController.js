const { Lesson } = require('../models/lesson')

exports.index = async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.lessonId)
  if (!lesson) return res.status(404).send("Lesson with the given ID not found.")
  
  res.send(lesson.coverPhoto)
}

exports.update = async (req, res, next) => {
  // Upload to Cloudinary or get callback from front end?
  // attach new photo URL to lesson here
  const lesson = await Lesson.findById(req.params.lessonId)
  lesson.coverPhoto.location = req.body.coverPhoto.location
  await lesson.save()
  if (!lesson) return res.status(404).send("Lesson with the given ID not found.")
  
  res.status(201).send(lesson.coverPhoto)
}