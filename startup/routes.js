module.exports = function(app) {
    app.use('/api/auth/', require('../routes/authRoutes'))
    app.use('/api/users/', require('../routes/usersRoutes'))
    app.use('/api/user/:userId/scores/', require('../routes/userScoresRoutes'))
    app.use('/api/questions/', require('../routes/questionsRoutes'))
    app.use('/api/operators/', require('../routes/operatorsRoutes'))
    app.use('/api/lessons/', require('../routes/lessonsRoutes'))
    app.use('/api/lesson/:lessonId/questions/', require('../routes/lessonQuestionsRoutes'))
    app.use('/api/lesson/:lessonId/programs/', require('../routes/lessonProgramsRoutes'))
    app.use('/api/published-lessons/', require('../routes/publishedLessonsRoutes'))
    app.use('/api/posts/', require('../routes/postsRoutes'))
    app.use('/api/programs/', require('../routes/programsRoutes'))

    app.use((error, req, res, next) => {
        const status = error.statusCode || 500
        const message = error.message || "Server error."
        res.status(status).send(message)
    })
}