const { Lesson } = require('../models/lesson')

exports.index = (req, res, next) => {
  
  res.send(['index', req.params])
}

exports.update = async (req, res, next) => {
  console.log(req.body.content)
  const lesson = await Lesson.findByIdAndUpdate(
    req.params.lessonId, {
      content: req.body.content,
    }, { new: true }) // Send the new document back
  if (!lesson) return res.status(404).send("Lesson with given ID not found.")

  res.send(lesson)
}
