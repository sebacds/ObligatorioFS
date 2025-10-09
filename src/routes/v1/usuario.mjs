import express from 'express';
import reqValidate from '../../constants/request-validate-constants.mjs';
import { obtenerPerfil, editarPerfil, eliminarPerfil, pagar, obtenerUsuarios, obtenerUsuarioPorId, editarUsuarioPorId, eliminarUsuarioPorId, crearAdmin } from '../../controllers/usuario-controller.mjs';
import { validarObtenerUsuarioPorId, validarEditarUsuario, validarPagar, validarEliminarUsuario, validarCrearUsuario } from '../../validations/usuario-validations.mjs';
import validarRequest from '../../middlewares/validation-middleware.mjs';
import authMiddleware from '../../middlewares/auth-middleware.mjs';
import validarRolMiddleware from '../../middlewares/validar-rol-middleware.mjs';

const routes = express.Router();

routes.use(authMiddleware);

routes.get('/perfil', obtenerPerfil);
routes.put('/perfil', validarRequest(validarEditarUsuario, reqValidate.BODY), editarPerfil);
routes.delete('/perfil', eliminarPerfil);

routes.post('/pagar', validarRolMiddleware(['propietario']), validarRequest(validarPagar, reqValidate.BODY), pagar);

routes.use(validarRolMiddleware(['admin']));
routes.post('/admin', validarRequest(validarCrearUsuario, reqValidate.BODY), crearAdmin);
routes.get('/', obtenerUsuarios);
routes.get('/:id', validarRequest(validarObtenerUsuarioPorId, reqValidate.PARAMS), obtenerUsuarioPorId);
routes.put('/:id', validarRequest(validarEditarUsuario, reqValidate.BODY), editarUsuarioPorId);
routes.delete('/:id', validarRequest(validarEliminarUsuario, reqValidate.PARAMS), eliminarUsuarioPorId);


export default routes;