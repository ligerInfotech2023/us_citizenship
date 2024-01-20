const {Segments, Joi, celebrate} = require('celebrate')

module.exports = {
    addReadingQuesOrSentValidator: () => celebrate({
        [Segments.BODY]:Joi.object().keys({
            question: Joi.string().not(null).required()
        })
    })
}