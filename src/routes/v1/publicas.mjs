import express from 'express';
// importar controladores (registro y login)
// importar middlewares
import reqValidate from '../../constants/request-validate-constants.mjs'

const routes = express.Router();

// routes.post('/signup', validateRequest(validateSignup, reqValidate.BODY), createUser);
// routes.post('/login', validateRequest(validateLogin, reqValidate.BODY), loginUser);

export default routes;