const {Segments, Joi, celebrate} = require('celebrate');
const { SmallTalk_Category } = require('../helper/enum');


module.exports = {
    addSmallTalkValidator: () => celebrate({
        [Segments.BODY]: Joi.object().keys({
            category: Joi.string().not(null).valid(SmallTalk_Category).required(),
            question: Joi.string().not(null).required(),
            response: Joi.string().not(null).required(),
        })
    })
}