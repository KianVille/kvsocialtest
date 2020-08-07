const Joi = require('@hapi/joi');

const signupValidation = data => {
    const signupSchema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    return signupSchema.validate(data);
}

const loginValidation = data => {
    const loginSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    return loginSchema.validate(data);
}

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;