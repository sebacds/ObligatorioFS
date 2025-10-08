import Joi from 'joi';

export const validarCrearMascota = Joi.object({
    nombre: Joi.string().required(),
    fechaNacimiento: Joi.date().required(),
    propietario: Joi.string().hex().length(24).required().messages({ 'string.length': 'El ID del propietario no es válido' }),
    categoria: Joi.string().hex().length(24).required().messages({ 'string.length': 'El ID de la categoría no es válido' })
});

export const validarObtenerMascotaPorId = Joi.object({
    id: Joi.string().hex().length(24).required().messages({ 'string.length': 'El ID de la mascota no es válido' })
});

export const validarObtenerMascotasPorPropietario = Joi.object({
    propietarioId: Joi.string().hex().length(24).required().messages({ 'string.length': 'El ID del propietario no es válido' })
});

export const validarEditarMascota = Joi.object({
    nombre: Joi.string(),
    fechaNacimiento: Joi.date(),
    propietario: Joi.string().hex().length(24).messages({ 'string.length': 'El ID del propietario no es válido' }),
    categoria: Joi.string().hex().length(24).messages({ 'string.length': 'El ID de la categoría no es válido' })
}).min(1);

export const validarEliminarMascota = Joi.object({
    id: Joi.string().hex().length(24).required().messages({ 'string.length': 'El ID de la mascota no es válido' })
});