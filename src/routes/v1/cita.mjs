import express from 'express';
import reqValidate from '../../constants/request-validate-constants.mjs';
import { obtenerCitas, crearCita, obtenerCitasPropias, obtenerCitasPorMascota, obtenerCitaPorId, cancelarCita, obtenerCitasPorPropietario, editarCita } from '../../controllers/cita-controller.mjs';
import { validarCrearCita, validarObtenerCitasPorMascota, validarObtenerCitaPorId, validarCancelarCita, validarObtenerCitasPorPropietario, validarEditarCita } from '../../validations/cita-validations.mjs';
import validarRequest from '../../middlewares/validation-middleware.mjs';
import authMiddleware from '../../middlewares/auth-middleware.mjs';
import validarRolMiddleware from '../../middlewares/validar-rol-middleware.mjs';

const routes = express.Router();

routes.use(authMiddleware);

routes.get('/', validarRolMiddleware(['admin']), obtenerCitas);

routes.post('/', validarRequest(validarCrearCita, reqValidate.BODY), crearCita);
routes.get('/mis-citas', obtenerCitasPropias);
routes.get('/mascota/:id', validarRequest(validarObtenerCitasPorMascota, reqValidate.PARAMS), obtenerCitasPorMascota);
routes.get('/:id', validarRequest(validarObtenerCitaPorId, reqValidate.PARAMS), obtenerCitaPorId);
routes.patch('/cancelar/:id', validarRequest(validarCancelarCita, reqValidate.PARAMS), cancelarCita);

routes.use(validarRolMiddleware(['admin']));
routes.get('/propietario/:id', validarRequest(validarObtenerCitasPorPropietario, reqValidate.PARAMS), obtenerCitasPorPropietario);
routes.put('/:id', validarRequest(validarEditarCita, reqValidate.BODY), editarCita);

export default routes;