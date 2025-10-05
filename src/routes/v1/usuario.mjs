import express from 'express';
import reqValidate from '../../constants/request-validate-constants.mjs';
import { obtenerUsuarioPorId, editarUsuario, pagar, eliminarUsuario, cerrarSesion } from '../../controllers/usuario-controller.mjs';
import { validarObtenerUsuarioPorId, validarEditarUsuario, validarPagar, validarEliminarUsuario } from '../../validations/usuario-validations.mjs';
import validarRequest from '../../middlewares/validation-middleware.mjs';
import authMiddleware from '../../middlewares/auth-middleware.mjs';
import validarRolMiddleware from '../../middlewares/validar-rol-middleware.mjs';

const routes = express.Router();

routes.use(authMiddleware);

routes.get('/:id', validarRequest(validarObtenerUsuarioPorId, reqValidate.PARAMS), obtenerUsuarioPorId);
routes.put('/:id', validarRequest(validarEditarUsuario, reqValidate.BODY), editarUsuario);
routes.delete('/:id', validarRequest(validarEliminarUsuario, reqValidate.PARAMS), eliminarUsuario);
routes.post('/logout', cerrarSesion);

routes.use(validarRolMiddleware(['propietario']));

routes.post('/pagar', validarRequest(validarPagar, reqValidate.BODY), pagar);

export default routes;