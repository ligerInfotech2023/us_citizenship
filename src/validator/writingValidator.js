const {Segments, Joi, celebrate} = require('celebrate')

module.exports = {
    addWritingQuesOrSentValidator: () => celebrate({
        [Segments.BODY]: Joi.object().keys({
            question: Joi.string().not(null).required()
        })
    })
}