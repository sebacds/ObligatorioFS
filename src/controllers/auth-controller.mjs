import usuarios from '../repositories/usuario-repository.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await usuarios.obtenerPorEmail(email);
        if (!usuario) return res.status(401).json({ message: 'Credenciales incorrectas' });

        if (!await bcrypt.compare(password, usuario.password)) return res.status(401).json({ message: 'Credenciales incorrectas' });

        const token = jwt.sign({ id: usuario._id, email: usuario.email, rol: usuario.rol, plan: usuario.plan }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ usuario, token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
}