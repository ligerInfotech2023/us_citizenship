const {Segments, Joi, celebrate} = require('celebrate')
const N400_Vocab_Classification = require('../helper/enum')

module.exports = {
    addN400QuestionValidator: () => celebrate({
        [Segments.BODY]: Joi.object().keys({
            classification: Joi.string().not(null).valid(N400_Vocab_Classification).required(),
            question: Joi.string().not(null).required(),
            options: Joi.string().not(null).required()
        })
    })
}