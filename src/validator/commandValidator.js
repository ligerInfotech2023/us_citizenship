const {Segments, Joi, celebrate} = require('celebrate')

module.exports = {
    addCommandValidator: () => celebrate({
        [Segments.BODY]:Joi.object().keys({
            command: Joi.string().not(null).required(),
            command_description: Joi.string().not(null).required(),
        })
    })
}