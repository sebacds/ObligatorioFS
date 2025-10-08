import Joi from 'joi';

export const validarAuth = Joi.object({
    id: Joi.string().hex().length(24).required(),
    email: Joi.string().email().required(),
    rol: Joi.string().valid('admin', 'propietario').required(),
    plan: Joi.string().valid('plus', 'premium'),
    iat: Joi.number().required(),
    exp: Joi.number().required()
})

export const validarLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})