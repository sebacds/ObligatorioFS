import Joi from 'joi';

export const validarCrearCategoria = Joi.object({
    nombre: Joi.string().required()
        .messages({
            'string.empty': 'El nombre de la categoría es requerido',
            'any.required': 'El nombre de la categoría es requerido'
        })
});

export const validarEditarCategoria = Joi.object({
    nombre: Joi.string().required()
        .messages({
            'string.empty': 'El nombre de la categoría es requerido',
            'any.required': 'El nombre de la categoría es requerido'
        })
});

export const validarObtenerCategoriaPorId = Joi.object({
    id: Joi.string().hex().length(24).required()
        .messages({
            'string.empty': 'El id de la categoría es requerido',
            'string.length': 'El id de la categoría no es válido',
            'any.required': 'El id de la categoría es requerido'
        })
});

export const validarEliminarCategoria = Joi.object({
    id: Joi.string().hex().length(24).required()
        .messages({
            'string.empty': 'El id de la categoría es requerido',
            'string.length': 'El id de la categoría no es válido',
            'any.required': 'El id de la categoría es requerido'
        })
});