const mongoose = require('mongoose');
const slug = require('slug');
const Joi = require('joi');

const operatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
  },
  slug: {
    type: String,
  },
  password: {
    type: String,
    default: 'floridakeys',
  },
  programs: [String],
  managers: [mongoose.SchemaTypes.ObjectId],
  annualRecognition: [{
    year: Number,
    requirements: {
      onlineTraining: Boolean,
      continuingEducation: [{
        title: String,
        description: String,
        date: Date,
      }],
      inPersonEvaluation: {
        date: Date,
        passed: Boolean,
        evaluator: String,
      },
    },
  }],
});

operatorSchema.pre('save', function (next) {
  this.slug = slug(this.name, { lower: true });
  next();
});

function validateOperator(operator) {
  const schema = {
    name: Joi.string().max(50).required(),
    password: Joi.string().required(),
    programs: Joi.array(),
    managers: Joi.array(),
  };
  return Joi.validate(operator, schema);
}

module.exports.Operator = mongoose.model('Operator', operatorSchema);
module.exports.validateOperator = validateOperator;
