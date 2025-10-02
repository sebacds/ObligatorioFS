import express from 'express';
import 'dotenv/config';
import conectarMongo from './config/mongo-config.mjs';
import conectarRedis from './config/redis-config.mjs';
import xssSanitizer from './middlewares/sanitizer-middleware.mjs';
import logRequest from './utils/logger.mjs';
import rutasPublicas from './routes/v1/publicas.mjs';
// import del resto de rutas privadas
import rutaNoEncontrada from './middlewares/not-found-middleware.mjs';

const app = express();

app.disable('x-powered-by');

conectarMongo();
conectarRedis();

app.use(express.json());
app.use(xssSanitizer);

app.use(async (req, res, next) => {
    await logRequest(req);
    next();
});

app.use('/api/v1', rutasPublicas);

app.use(rutaNoEncontrada);

app.use((err, req, res, next) => {
    console.error('Error en la aplicación:', err);
    res.status(err.statusCode ?? 500).json({ message: err.message ?? 'Error interno del servidor' });
});

export default app;