import Joi from 'joi';

export const validarAuth = Joi.object({
    id: Joi.string().hex().length(24).required()
        .messages({
            'string.empty': 'El id es requerido',
            'string.length': 'El id no es válido',
            'any.required': 'El id es requerido'
        }),
    email: Joi.string().email().required()
        .messages({
            'string.empty': 'El correo electrónico es requerido',
            'string.email': 'Debes proporcionar un correo electrónico válido',
            'any.required': 'El correo electrónico es requerido'
        }),
    rol: Joi.string().valid('admin', 'propietario').required()
        .messages({
            'any.only': 'El rol debe ser admin o propietario',
            'any.required': 'El rol es requerido'
        }),
    plan: Joi.string().valid('plus', 'premium').allow(null)
        .messages({
            'any.only': 'El plan debe ser plus o premium'
        }),
    iat: Joi.number().required(),
    exp: Joi.number().required()
});

export const validarLogin = Joi.object({
    email: Joi.string().email().required()
        .messages({
            'string.empty': 'El correo electrónico es requerido',
            'string.email': 'Debes proporcionar un correo electrónico válido',
            'any.required': 'El correo electrónico es requerido'
        }),
    password: Joi.string().min(8).required()
        .messages({
            'string.empty': 'La contraseña es requerida',
            'any.required': 'La contraseña es requerida'
        })
});