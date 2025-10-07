const validarRolMiddleware = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario || !rolesPermitidos.includes(req.usuario.Rol)) { 
            return res.status(403).json({ message: 'No tenes permisos para realizar esta acción' });
        }
        next();
    };
};

export default validarRolMiddleware;