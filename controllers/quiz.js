const { Quiz } = require('../models');

const readQuizzes = async (req, res) => {
  const quizzes = await Quiz.find();
  res.send(quizzes);
};

const createQuiz = async (req, res) => {
  const quiz = new Quiz({
    title: req.body.title,
    description: req.body.description,
    passingScorePercent: req.body.passingScorePercent,
    questions: req.body.questions,
    lessonId: req.body.lessonId,
  });

  await quiz.save();
  res.status(201).send(quiz);
};

module.exports = {
  readQuizzes,
  createQuiz,
};
