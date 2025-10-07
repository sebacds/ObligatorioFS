import Joi from "joi";

export const validarCrearUsuario = Joi.object({
    nombre: Joi.string().min(3).pattern(/^[\p{L}\s]+$/u).required()
        .messages({
            'string.pattern.base': 'El nombre solo puede contener letras'
        }),
    apellido: Joi.string().min(3).pattern(/^[\p{L}\s]+$/u).required()
        .messages({
            'string.pattern.base': 'El apellido solo puede contener letras'
        }),
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().min(8).required(),
    rol: Joi.string().valid('admin', 'propietario').default('propietario'),
    plan: Joi.string().valid('plus', 'premium').when('Rol', {
        is: 'propietario',
        then: Joi.required().default('plus'),
        otherwise: Joi.forbidden()
    }),
    metodoPago: Joi.string().valid('debito', 'credito').allow(null).default(null),
    fechaUltimoPago: Joi.date().allow(null).default(null),
    suscripcionActiva: Joi.boolean().default(false)
});

export const validarObtenerUsuarioPorId = Joi.object({
    id: Joi.string().hex().length(24).required()
        .messages({
            'string.length': 'El ID proporcionado no es válido'
        })
});

export const validarEditarUsuario = Joi.object({
    nombre: Joi.string().min(3).pattern(/^[\p{L}\s]+$/u)
        .messages({
            'string.pattern.base': 'El nombre solo puede contener letras'
        }),
    apellido: Joi.string().min(3).pattern(/^[\p{L}\s]+$/u)
        .messages({
            'string.pattern.base': 'El apellido solo puede contener letras'
        }),
    email: Joi.string().email().lowercase().trim(),
    password: Joi.string().min(8),
    plan: Joi.string().valid('plus', 'premium'),
    metodoPago: Joi.string().valid('debito', 'credito').allow(null),
    fechaUltimoPago: Joi.date().allow(null),
    suscripcionActiva: Joi.boolean()
}).min(1);

export const validarPagar = Joi.object({
    metodoPago: Joi.string().valid('debito', 'credito').required(),
    plan: Joi.string().valid('plus', 'premium').required()
});

export const validarEliminarUsuario = Joi.object({
    id: Joi.string().hex().length(24).required()
        .messages({
            'string.length': 'El ID proporcionado no es válido'
        })
});