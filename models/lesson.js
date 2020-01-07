const mongoose = require('mongoose')
const Joi = require('joi')

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    coverPhoto: {
        location: {
            type:String,
            default: 'https://res.cloudinary.com/duzmgsio4/image/upload/v1554164246/fknms-bluestar/about-fknms/aerial-reef.jpg'
        },
        altDescription: {
            type: String,
            default: "Aerial view of a coral reef in the Florida Keys."
        },
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
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    }],
})

function validateLesson(lesson) {
    const schema = {
        title: Joi.string().required(),
        description: Joi.string().required(),
        coverPhoto: Joi.string(),
        content: Joi.object(),
        published: Joi.boolean(),
        programs: Joi.any(),
        questions: Joi.any(),
    }
    return Joi.validate(lesson, schema)
}

module.exports.Lesson = mongoose.model('Lesson', lessonSchema)
module.exports.validateLesson = validateLesson