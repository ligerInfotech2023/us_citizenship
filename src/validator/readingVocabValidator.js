const {Segments, Joi, celebrate} = require('celebrate')
const { Reading_Vocab } = require('../helper/enum')

module.exports = {
    readingVocabValidator: () => celebrate({
        [Segments.BODY]:Joi.object().keys({
            category: Joi.string().not(null).valid(Reading_Vocab).required(),
            text: Joi.string().not(null).required(),
        })
    })
}