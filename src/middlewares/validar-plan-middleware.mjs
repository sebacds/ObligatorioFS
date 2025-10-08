const validarPlanMiddleware = (planesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario || !planesPermitidos.includes(req.usuario.plan)) { 
            return res.status(403).json({ message: 'No tenes permisos para realizar esta acción' });
        }
        next();
    };
};

export default validarPlanMiddleware;