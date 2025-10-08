import usuarios from '../repositories/usuario-repository.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        const usuario = await usuarios.obtenerPorEmail(Email);
        if (!usuario) return res.status(401).json({ message: 'Credenciales incorrectas' });

        if (!await bcrypt.compare(Password, usuario.Password)) return res.status(401).json({ message: 'Credenciales incorrectas' });

        const token = jwt.sign({ id: usuario._id, email: usuario.Email, rol: usuario.Rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ usuario: usuario, token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
}