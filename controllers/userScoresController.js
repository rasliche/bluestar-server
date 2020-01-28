const { User } = require('../models/user')
const { Lesson } = require('../models/lesson')
// expect a userId in the route and 
// a record in the request body

exports.index = async (req, res, next) => {
  const user = await User.findById(req.params.userId)
    .populate({ path: 'lessonScores.lesson' })
  if (!user) return res.status(404).send("No user found with the given ID.")
  
  res.send(user.lessonScores)
}

// This method is executed if the client sends a POST request
// It should be called if the client doesn't think the user has
// completed the quiz yet. Validation confirms in the route handler
exports.create = async (req, res, next) => {
  // Find the user
  const user = await User.findById(req.params.userId)
  if (!user) return res.status(404).send("No user found with the given ID.")
  
  // Find the lesson
  const lesson = await Lesson.findById(req.body.lessonId)
  if (!lesson) return res.status(404).send("No lesson found with the given ID.")

  // Find the provided lesson in the user's scores
  const userHasCompletedLesson = user.lessonScores.find(r => r.lesson == req.body.lessonId)
  // If it's there, return 400 because this should have been a PUT request
  if (userHasCompletedLesson) return res.status(400).send("Lesson provided is already scored for the user.")
  
  // Create score subdocument
  const scoreFromClient = {
    lesson: req.body.lessonId,
    score: req.body.score,
  }
  const scoreSubdocument = user.lessonScores.create(scoreFromClient)
  // Add to user document
  user.lessonScores.push(scoreSubdocument)
  await user.save()
  
  // Resource created, return the resource
  res.status(201).send(scoreSubdocument)
}

exports.read = (req, res, next) => {
  
  res.send('read')
}

// This method is executed if the client sends a PUT request
// It should be called if the client thinks the user has already
// completed the quiz with a . Validation confirms in the route handler
exports.update = async (req, res, next) => {
  // Find the user
  let user = await User.findById(req.params.userId)
  if (!user) return res.status(404).send("No user found with the given ID.")
  
  // Find the lesson
  const lesson = await Lesson.findById(req.params.lessonId)
  if (!lesson) return res.status(404).send("No lesson found with the given ID.")
  
  // Find the provided lesson in the user's scores
  const userHasCompletedLesson = user.lessonScores.find(r => r.lesson == req.params.lessonId)
  // If it's not there, return 400 because this should have been a POST request
  if (!userHasCompletedLesson) return res.status(400).send("Lesson provided has not been previously completed.")

  // If it is there, compare to submitted score and return if saved score is higher
  if (userHasCompletedLesson.score >= req.body.score ) return res.status(400).send("Saved score is the same or higher than submitted score.")

  // Update the score for the lesson
  userHasCompletedLesson.score = req.body.score
  await user.save()

  return res.status(200).send(userHasCompletedLesson)
}

exports.destroy = (req, res, next) => {
  
  res.send('destroy')
}
