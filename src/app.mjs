import express from 'express';
import 'dotenv/config';
import conectarMongo from './config/mongo-config.mjs';
import conectarRedis from './config/redis-config.mjs';
import xssSanitizer from './middlewares/sanitizer-middleware.mjs';
import logRequest from './utils/logger.mjs';
import publicas from './routes/v1/publicas.mjs';
import categorias from './routes/v1/categoria.mjs';
import citas from './routes/v1/cita.mjs';
import mascotas from './routes/v1/mascota.mjs';
import usuarios from './routes/v1/usuario.mjs';
import rutaNoEncontrada from './middlewares/not-found-middleware.mjs';
import limiter from './middlewares/limiter-middleware.mjs';
import cors from 'cors';

const app = express();

app.disable('x-powered-by');

conectarMongo();
conectarRedis();

app.use(cors())
app.use(express.json());
app.use(xssSanitizer);

app.use(async (req, res, next) => {
    await logRequest(req);
    next();
});

app.use('/api/v1', limiter);

app.use('/api/v1', publicas);
app.use('/api/v1/categorias', categorias);
app.use('/api/v1/citas', citas);
app.use('/api/v1/mascotas', mascotas);
app.use('/api/v1/usuarios', usuarios);

app.use(rutaNoEncontrada);

app.use((err, req, res, next) => {
    console.error('Error en la aplicación:', err);
    res.status(err.statusCode ?? 500).json({ message: err.message ?? 'Error interno del servidor' });
});

export default app;