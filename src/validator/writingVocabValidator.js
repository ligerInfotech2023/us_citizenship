const {Segments, Joi, celebrate} = require('celebrate')
const { Writing_Vocab } = require('../helper/enum')

module.exports = {
    writingVocabValidator: () => celebrate({
        [Segments.BODY]: Joi.object().keys({
            category: Joi.string().not(null).valid(Writing_Vocab).required(),
            text: Joi.string().not(null).required(),
        })
    })
}