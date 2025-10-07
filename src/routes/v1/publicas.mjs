import express from 'express';
import reqValidate from '../../constants/request-validate-constants.mjs';
import { crearUsuario } from '../../controllers/usuario-controller.mjs';
import { login } from '../../controllers/auth-controller.mjs';
import { validarCrearUsuario } from '../../validations/usuario-validations.mjs';
import { validarLogin } from '../../validations/auth-validations.mjs';
import validarRequest from '../../middlewares/validation-middleware.mjs';

const routes = express.Router();

routes.post('/signup', validarRequest(validarCrearUsuario, reqValidate.BODY), crearUsuario);
routes.post('/login', validarRequest(validarLogin, reqValidate.BODY), login);

export default routes;