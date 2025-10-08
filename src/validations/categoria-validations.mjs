import Joi from 'joi';

export const validarCrearCategoria = Joi.object({
    nombre: Joi.string().required()
});

export const validarEditarCategoria = Joi.object({
    nombre: Joi.string().required()
});

export const validarEliminarCategoria = Joi.object({
    id: Joi.string().hex().length(24).required().messages({ 'string.length': 'El ID de la categoría no es válido' })
});