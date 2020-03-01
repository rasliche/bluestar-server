const { Lesson } = require('../models/lesson')
const { Question, validateQuestion } = require('../models/question')

exports.index = async (req, res, next) => {
  const { questions } = await Lesson.findById(req.params.lessonId).populate('questions')
  res.send(questions)
}

exports.create = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId)
    if (!lesson) return res.status(404).send("Lesson with given ID not found.")
    
    const { error } = validateQuestion(req.body)
    if (error) return res.status(400).send('Invalid question provided.')
    
    const question = await new Question({
      lesson: req.params.lessonId,
      text: req.body.text,
      answers: req.body.answers,
      theMoreYouKnow: req.body.theMoreYouKnow
    }).save()
    lesson.questions.push(question._id)
    await lesson.save()
    
    res.send(question)
  } catch (error) {
    console.log(error)
  }
}

exports.read = (req, res, next) => {
  
  res.send('read')
}

exports.update = (req, res, next) => {
  
  res.send('update')
}

exports.destroy = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId)
    if (!lesson) return res.status(404).send("Lesson with given ID not found.")
    const question = await Question.findByIdAndDelete(req.params.questionId)
    if(!question) return res.status(404).send("Question with the given ID not found.")
    lesson.questions.pull(question)
    await lesson.save()
    res.send(question)
  } catch (error) {
    console.log(error)
  }
}
