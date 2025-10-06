import express from 'express';
import reqValidate from '../../constants/request-validate-constants.mjs';
import { crearCita, obtenerCitas, obtenerCitasPorPropietario, obtenerCitasPorMascota, editarCita } from '../../controllers/cita-controller.mjs';
import { validarCrearCita, validarEditarCita, validarObtenerCitasPorPropietario, validarObtenerCitasPorMascota } from '../../validations/cita-validations.mjs';
import validarRequest from '../../middlewares/validation-middleware.mjs';
import authMiddleware from '../../middlewares/auth-middleware.mjs';

const routes = express.Router();

routes.use(authMiddleware);

routes.post('/', validarRequest(validarCrearCita, reqValidate.BODY), crearCita);
routes.get('/', obtenerCitas);
routes.get('/propietario/:propietarioId', validarRequest(validarObtenerCitasPorPropietario, reqValidate.PARAMS), obtenerCitasPorPropietario);
routes.get('/mascota/:mascotaId', validarRequest(validarObtenerCitasPorMascota, reqValidate.PARAMS), obtenerCitasPorMascota);
routes.put('/:id', validarRequest(validarEditarCita, reqValidate.BODY), editarCita);

export default routes;