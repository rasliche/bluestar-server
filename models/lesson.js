const mongoose = require('mongoose')
// const slug = require('slug')
const Joi = require('joi')
const { questionSchema } = require('./question.js')

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
    programs: [
        { type: String }
    ],
    // slug: {
    //     type: String,
    //     unique: true
    // },
    questions: [ questionSchema ],
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
        programs: Joi.array().items( Joi.string() ),
        questions: Joi.array(),
    }
    return Joi.validate(lesson, schema)
}

module.exports.Lesson = mongoose.model('Lesson', lessonSchema)
module.exports.validateLesson = validateLesson