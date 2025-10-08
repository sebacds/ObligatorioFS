import Joi from 'joi';

export const validarCrearCita = Joi.object({
    propietario: Joi.string().hex().length(24).required().messages({ 'string.length': 'El ID del propietario no es válido'}),
    mascota: Joi.string().hex().length(24).required().messages({ 'string.length': 'El ID de la mascota no es válido' }),
    motivo: Joi.string().required(),
    fecha: Joi.date().required(),
    estado: Joi.string().valid('pendiente', 'aceptada', 'cancelada', 'rechazada', 'finalizada').default('pendiente')
});

export const validarObtenerCitasPorPropietario = Joi.object({
    propietarioId: Joi.string().hex().length(24).required().messages({ 'string.length': 'El ID del propietario no es válido' })
});

export const validarObtenerCitasPorMascota = Joi.object({
    mascotaId: Joi.string().hex().length(24).required().messages({ 'string.length': 'El ID de la mascota no es válido' })
});

export const validarEditarCita = Joi.object({
    propietario: Joi.string().hex().length(24).messages({ 'string.length': 'El ID del propietario no es válido' }),
    mascota: Joi.string().hex().length(24).messages({ 'string.length': 'El ID de la mascota no es válido' }),
    motivo: Joi.string(),
    fecha: Joi.date(),
    estado: Joi.string().valid('pendiente', 'aceptada', 'cancelada', 'rechazada', 'finalizada')
}).min(1);