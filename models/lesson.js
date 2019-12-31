const mongoose = require('mongoose')
// const slug = require('slug')
const Joi = require('joi')
// const { questionSchema } = require('./question.js')

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: mongoose.Schema.Types.Mixed
    },
    published: {
        type: Boolean,
        default: false
    },
    programs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
    }],
    // slug: {
    //     type: String,
    //     unique: true
    // },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    }],
})

// lessonSchema.pre('save', function(next) {
//     this.slug = slug(this.title)
//     next()
// })

function validateLesson(lesson) {
    const schema = {
        title: Joi.string().required(),
        description: Joi.string().required(),
        content: Joi.object(),
        published: Joi.boolean(),
        programs: Joi.any(),
        questions: Joi.any(),
    }
    return Joi.validate(lesson, schema)
}

module.exports.Lesson = mongoose.model('Lesson', lessonSchema)
module.exports.validateLesson = validateLesson