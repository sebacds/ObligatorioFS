import express from 'express';
import reqValidate from '../../constants/request-validate-constants.mjs';
import { crearUsuario } from '../../controllers/usuario-controller.mjs';
import { validarSignup, validarLogin } from '../../validations/publicas-validations.mjs';
import validarRequest from '../../middlewares/validation-middleware.mjs';

const routes = express.Router();

routes.post('/signup', validarRequest(validarSignup, reqValidate.BODY), crearUsuario);
routes.post('/login', validarRequest(validarLogin, reqValidate.BODY), iniciarSesion);

export default routes;