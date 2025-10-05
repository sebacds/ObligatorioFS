import express from 'express';
import reqValidate from '../../constants/request-validate-constants.mjs';
import { crearMascota, obtenerMascotaPorId, obtenerMascotasPorPropietario, editarMascota, eliminarMascota } from '../../controllers/mascota-controller.mjs';
import { validarCrearMascota, validarObtenerMascotaPorId, validarObtenerMascotasPorPropietario, validarEditarMascota, validarEliminarMascota } from '../../validations/mascota-validations.mjs';
import validarRequest from '../../middlewares/validation-middleware.mjs';
import authMiddleware from '../../middlewares/auth-middleware.mjs';
import validarRolMiddleware from '../../middlewares/validar-rol-middleware.mjs';

const routes = express.Router();

routes.use(authMiddleware);

routes.post('/', validarRequest(validarCrearMascota, reqValidate.BODY), crearMascota);
routes.get('/:id', validarRequest(validarObtenerMascotaPorId, reqValidate.PARAMS), obtenerMascotaPorId);
routes.get('/propietario/:propietarioId', validarRequest(validarObtenerMascotasPorPropietario, reqValidate.PARAMS), obtenerMascotasPorPropietario);
routes.put('/:id', validarRequest(validarEditarMascota, reqValidate.BODY), editarMascota);
routes.delete('/:id', validarRequest(validarEliminarMascota, reqValidate.PARAMS), eliminarMascota);

export default routes;