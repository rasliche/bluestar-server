const Joi = require('joi')
const mongoose = require('mongoose')

const Topic = mongoose.model('Topic', mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    relevantPrograms: [String],
    content: {
        type: String,
        required: true
    }
}))

function validateTopic(topic) {
    const schema = {
        title: Joi.string().required(),
        relevantPrograms: Joi.array(),
        content: Joi.string().required()
    }
    return Joi.validate(topic, schema)
}

module.exports.Topic = Topic
module.exports.validate = validateTopic
