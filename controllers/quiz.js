const express = require('express');
const { Quiz } = require('../models/quiz.js');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const quizzes = await Quiz.find();
  res.send(quizzes);
});

router.post('/', async (req, res, next) => {
  const quiz = new Quiz({
    title: req.body.title,
    description: req.body.description,
    passingScorePercent: req.body.passingScorePercent,
    questions: req.body.questions,
    lessonId: req.body.lessonId,
  });

  await quiz.save();
  res.status(201).send(quiz);
});

module.exports = router;
