import Joi from 'joi';

export const validarCrearCita = Joi.object({
    propietario: Joi.string().hex().length(24)
        .messages({
            'string.length': 'El id del propietario no es válido'
        }),
    mascota: Joi.string().hex().length(24).required()
        .messages({
            'string.empty': 'Debes seleccionar una mascota',
            'string.length': 'El id de la mascota no es válido',
            'any.required': 'Debes seleccionar una mascota'
        }),
    motivo: Joi.string().required()
        .messages({
            'string.empty': 'El motivo de la cita es requerido',
            'any.required': 'El motivo de la cita es requerido'
        }),
    fecha: Joi.date().required()
        .messages({
            'date.base': 'Debes proporcionar una fecha válida',
            'any.required': 'La fecha de la cita es requerida'
        })
});

export const validarObtenerCitasPorPropietario = Joi.object({
    id: Joi.string().hex().length(24).required()
        .messages({
            'string.empty': 'El id del propietario es requerido',
            'string.length': 'El id del propietario no es válido',
            'any.required': 'El id del propietario es requerido'
        })
});

export const validarObtenerCitasPorMascota = Joi.object({
    id: Joi.string().hex().length(24).required()
        .messages({
            'string.empty': 'El id de la mascota es requerido',
            'string.length': 'El id de la mascota no es válido',
            'any.required': 'El id de la mascota es requerido'
        })
});

export const validarObtenerCitaPorId = Joi.object({
    id: Joi.string().hex().length(24).required()
        .messages({
            'string.empty': 'El id de la cita es requerido',
            'string.length': 'El id de la cita no es válido',
            'any.required': 'El id de la cita es requerido'
        })
});

export const validarCancelarCita = Joi.object({
    id: Joi.string().hex().length(24).required()
        .messages({
            'string.empty': 'El id de la cita es requerido',
            'string.length': 'El id de la cita no es válido',
            'any.required': 'El id de la cita es requerido'
        })
});

export const validarEditarCita = Joi.object({
    estado: Joi.string().valid('aceptada', 'cancelada', 'rechazada', 'finalizada').required()
        .messages({
            'string.empty': 'El estado de la cita es requerido',
            'any.only': 'El estado debe ser: aceptada, cancelada, rechazada o finalizada',
            'any.required': 'El estado de la cita es requerido'
        })
});