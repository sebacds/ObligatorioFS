import jwt from 'jsonwebtoken';
import { validarAuth } from '../validations/usuario-validations.mjs';
import 'dotenv/config';

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) return res.status(401).json({ message: 'No se pudo autenticar' });

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { error, value } = validarAuth.validate(decoded, { abortEarly: false });

        if (error) return res.status(401).json({ errors: error.details.map(d => d.message) });

        req.usuario = usuario;
        next();
    } catch (error) {
        switch (error.name) {
            case 'JsonWebTokenError':
            case 'TokenExpiredError':
                return res.status(401).json({ message: 'No autorizado' });
            default:
                return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

export default authMiddleware;