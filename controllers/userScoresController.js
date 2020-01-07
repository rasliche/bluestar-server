const { User, validateRecord } = require('../models/user')
const { Lesson } = require('../models/lesson')
// expect a userId in the route and 
// a record in the request body

exports.index = async (req, res, next) => {
  const user = await User.findById(req.params.userId)
    .populate({ path: 'lessonScores.lesson' })
  if (!user) return res.status(404).send("No user found with the given ID.")
  
  res.send(user.lessonScores)
}

exports.create = async (req, res, next) => {
  const user = await User.findById(req.params.userId)
  if (!user) return res.status(404).send("No user found with the given ID.")
  
  const lesson = await Lesson.findById(req.body.lessonId).select('title programs')

  const newScore = {
    lesson: req.body.lessonId,
    score: req.body.score,
  }
  const savedScore = user.lessonScores.create(newScore)
  user.lessonScores.push(savedScore)
  await user.save()
  
  savedScore.lesson = lesson
  res.send(savedScore)
}

exports.read = (req, res, next) => {
  
  res.send('read')
}

exports.update = async (req, res, next) => {
  // validation found in User.js Model
  const { error } = validateRecord(req.body)
  if (error) { return res.status(400).send("Invalid record received.")}
  // Will we need to modify this to allow admin access?
  if (req.token._id !== req.params.userId) { return res.status(401).send("User does not match authorization token.")}
  // Look up user
  // If not existing, return 404 - Resource not found
  let user = await User.findById(req.params.userId).select('-password')
  if (!user) return res.status(404).send("The user with the given ID was not found.")
  
  let lessonRecord = user.lessonScores.find(r => r.lessonId === req.body.lessonId)
  console.log(lessonRecord)
  if (!lessonRecord) { 
      user.lessonScores.push(req.body)
      await user.save()
      return res.status(201).send(user)
  } else if (req.body.score > lessonRecord.score) {
      lessonRecord.score = req.body.score
      await user.save()
      return res.status(200).send(user)
  } else {
      // nothing to update
      console.log('Nothing updated.')
      return res.status(200).send(user)
  }
}

exports.destroy = (req, res, next) => {
  
  res.send('destroy')
}
