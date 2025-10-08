import Joi from 'joi';

export const validarCrearMascota = Joi.object({
    nombre: Joi.string().required()
        .messages({
            'string.empty': 'El nombre de la mascota es requerido',
            'any.required': 'El nombre de la mascota es requerido'
        }),
    fechaNacimiento: Joi.date().required()
        .messages({
            'date.base': 'Debes proporcionar una fecha de nacimiento válida',
            'any.required': 'La fecha de nacimiento es requerida'
        }),
    propietario: Joi.string().hex().length(24)
        .messages({
            'string.length': 'El id del propietario no es válido'
        }),
    categoria: Joi.string().hex().length(24).required()
        .messages({
            'string.empty': 'Debes seleccionar una categoría',
            'string.length': 'El id de la categoría no es válido',
            'any.required': 'Debes seleccionar una categoría'
        })
});

export const validarObtenerMascotaPorId = Joi.object({
    id: Joi.string().hex().length(24).required()
        .messages({
            'string.empty': 'El id de la mascota es requerido',
            'string.length': 'El id de la mascota no es válido',
            'any.required': 'El id de la mascota es requerido'
        })
});

export const validarObtenerMascotasPorPropietario = Joi.object({
    id: Joi.string().hex().length(24).required()
        .messages({
            'string.empty': 'El id del propietario es requerido',
            'string.length': 'El id del propietario no es válido',
            'any.required': 'El id del propietario es requerido'
        })
});

export const validarEditarMascota = Joi.object({
    nombre: Joi.string()
        .messages({
            'string.empty': 'El nombre de la mascota no puede estar vacío'
        }),
    fechaNacimiento: Joi.date()
        .messages({
            'date.base': 'Debes proporcionar una fecha de nacimiento válida'
        }),
    categoria: Joi.string().hex().length(24)
        .messages({
            'string.length': 'El id de la categoría no es válido'
        })
}).min(1)
    .messages({
        'object.min': 'Debes proporcionar al menos un campo para actualizar'
    });

export const validarEliminarMascota = Joi.object({
    id: Joi.string().hex().length(24).required()
        .messages({
            'string.empty': 'El id de la mascota es requerido',
            'string.length': 'El id de la mascota no es válido',
            'any.required': 'El id de la mascota es requerido'
        })
});