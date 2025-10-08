import Joi from "joi";

export const validarCrearUsuario = Joi.object({
    nombre: Joi.string().min(3).pattern(/^[\p{L}\s]+$/u).required()
        .messages({
            'string.empty': 'El nombre es requerido',
            'string.min': 'El nombre debe tener al menos 3 caracteres',
            'string.pattern.base': 'El nombre solo puede contener letras',
            'any.required': 'El nombre es requerido'
        }),
    apellido: Joi.string().min(3).pattern(/^[\p{L}\s]+$/u).required()
        .messages({
            'string.empty': 'El apellido es requerido',
            'string.min': 'El apellido debe tener al menos 3 caracteres',
            'string.pattern.base': 'El apellido solo puede contener letras',
            'any.required': 'El apellido es requerido'
        }),
    email: Joi.string().email().lowercase().trim().required()
        .messages({
            'string.empty': 'El correo electrónico es requerido',
            'string.email': 'Debes proporcionar un correo electrónico válido',
            'any.required': 'El correo electrónico es requerido'
        }),
    password: Joi.string().min(8).required()
        .messages({
            'string.empty': 'La contraseña es requerida',
            'string.min': 'La contraseña debe tener al menos 8 caracteres',
            'any.required': 'La contraseña es requerida'
        }),
    rol: Joi.string().valid('admin', 'propietario').default('propietario')
        .messages({
            'any.only': 'El rol debe ser admin o propietario'
        }),
    plan: Joi.string().valid('plus', 'premium').when('rol', {
        is: 'propietario',
        then: Joi.required().default('plus'),
        otherwise: Joi.forbidden()
    })
        .messages({
            'any.only': 'El plan debe ser plus o premium',
            'any.required': 'Debes seleccionar un plan'
        }),
    metodoPago: Joi.string().valid('debito', 'credito').allow(null).default(null)
        .messages({
            'any.only': 'El método de pago debe ser débito o crédito'
        }),
    fechaPago: Joi.date().allow(null).default(null)
        .messages({
            'date.base': 'La fecha de pago no es válida'
        })
});

export const validarObtenerUsuarioPorId = Joi.object({
    id: Joi.string().hex().length(24).required()
        .messages({
            'string.empty': 'El id del usuario es requerido',
            'string.length': 'El id del usuario no es válido',
            'any.required': 'El id del usuario es requerido'
        })
});

export const validarEditarUsuario = Joi.object({
    nombre: Joi.string().min(3).pattern(/^[\p{L}\s]+$/u)
        .messages({
            'string.empty': 'El nombre no puede estar vacío',
            'string.min': 'El nombre debe tener al menos 3 caracteres',
            'string.pattern.base': 'El nombre solo puede contener letras'
        }),
    apellido: Joi.string().min(3).pattern(/^[\p{L}\s]+$/u)
        .messages({
            'string.empty': 'El apellido no puede estar vacío',
            'string.min': 'El apellido debe tener al menos 3 caracteres',
            'string.pattern.base': 'El apellido solo puede contener letras'
        }),
    email: Joi.string().email().lowercase().trim()
        .messages({
            'string.empty': 'El correo electrónico no puede estar vacío',
            'string.email': 'Debes proporcionar un correo electrónico válido'
        }),
    password: Joi.string().min(8)
        .messages({
            'string.empty': 'La contraseña no puede estar vacía',
            'string.min': 'La contraseña debe tener al menos 8 caracteres'
        }),
    passwordActual: Joi.string().min(8)
        .messages({
            'string.empty': 'La contraseña actual no puede estar vacía',
            'string.min': 'La contraseña actual debe tener al menos 8 caracteres'
        }),
    passwordNueva: Joi.string().min(8)
        .messages({
            'string.empty': 'La contraseña nueva no puede estar vacía',
            'string.min': 'La contraseña nueva debe tener al menos 8 caracteres'
        })
}).min(1)
    .messages({
        'object.min': 'Debes proporcionar al menos un campo para actualizar'
    });

export const validarPagar = Joi.object({
    metodoPago: Joi.string().valid('debito', 'credito').required()
        .messages({
            'string.empty': 'El método de pago es requerido',
            'any.only': 'El método de pago debe ser débito o crédito',
            'any.required': 'El método de pago es requerido'
        })
});

export const validarEliminarUsuario = Joi.object({
    id: Joi.string().hex().length(24).required()
        .messages({
            'string.empty': 'El id del usuario es requerido',
            'string.length': 'El id del usuario no es válido',
            'any.required': 'El id del usuario es requerido'
        })
});