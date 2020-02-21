const { Lesson } = require('../models/lesson')

exports.index = async (req, res, next) => {
  const lessons = await Lesson.find({ published: true })
  if (!lessons) { return res.status(404).send('No published lessons found.') }
  res.send(lessons)
}

exports.create = async (req, res, next) => {
  const lesson = await Lesson.findByIdAndUpdate(
    req.body.lessonId, // find this document
    { published: true }, // update the published field
    { new: true } // return the new version of the document
  )
  res.send(lesson)
}

// exports.read = (req, res, next) => {
    
//     res.send(['read', req.params])
// }

exports.destroy = async (req, res, next) => {
  const lesson = await Lesson.findByIdAndUpdate(
    req.params.lessonId, // find this document
    { published: false }, // update the published field
    { new: true } // return the new version of the document
  )
  res.send(lesson)
}
