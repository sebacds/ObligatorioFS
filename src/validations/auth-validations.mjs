import Joi from 'joi';

export const validarLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})