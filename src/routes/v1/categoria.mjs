import express from 'express';
import reqValidate from '../../constants/request-validate-constants.mjs';
import { crearCategoria, obtenerCategorias, editarCategoria, eliminarCategoria } from '../../controllers/categoria-controller.mjs';
import { validarCrearCategoria, validarEditarCategoria, validarEliminarCategoria } from '../../validations/categoria-validations.mjs';
import validarRequest from '../../middlewares/validation-middleware.mjs';
import authMiddleware from '../../middlewares/auth-middleware.mjs';
import validarRolMiddleware from '../../middlewares/validar-rol-middleware.mjs';

const routes = express.Router();

routes.use(authMiddleware);

routes.get('/', obtenerCategorias);

routes.use(validarRolMiddleware(['admin']));

routes.post('/', validarRequest(validarCrearCategoria, reqValidate.BODY), crearCategoria);
routes.put('/:id', validarRequest(validarEditarCategoria, reqValidate.BODY), editarCategoria);
routes.delete('/:id', validarRequest(validarEliminarCategoria, reqValidate.PARAMS), eliminarCategoria);

export default routes;