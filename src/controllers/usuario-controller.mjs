import usuarioRepository from "../repositories/usuarioRepository.mjs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const crearUsuario = async (req, res) => {
    try {
        const { Nombre, Apellido, Email, Password } = req.body;
        const usuarioExistente = await usuarioRepository.obtenerPorEmail(Email);
        if (usuarioExistente) {
            return res.status(409).json({ error: "El email ya está registrado" });
        }
        const hashPassword = await bcrypt.hash(Password, 10);
        const nuevoUsuario = await usuarioRepository.crearUsuario({
            Nombre,
            Apellido,
            Email,
            Password: hashPassword
        });
        const token = jwt.sign(
            { 
                id: nuevoUsuario._id, 
                email: nuevoUsuario.Email, 
                rol: nuevoUsuario.Rol 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );
        res.status(201).json({ 
            usuario: nuevoUsuario.select('-Password -MetodoPago -FechaUltimoPago'), 
            token 
        });

    } catch (error) {
        console.error("Error al crear usuario");
        
        // Manejar errores específicos de Mongoose
        if (error.code === 11000) {
            return res.status(409).json({ error: "El email ya está registrado" });
        }
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                error: "Datos inválidos"
            });
        }

        res.status(500).json({ error: "Error al crear el usuario" });
    }   
}

export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioRepository.obtenerUsuarios();
        if (!usuarios || usuarios.length === 0) {
            return res.status(404).json({ error: "No se encontraron usuarios" });
        }
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};

export const obtenerUsuarioPorEmail = async (req, res) => {
    const { data } = req.body;
    try {
        const usuario = await usuarioRepository.obtenerPorEmail(data);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario por email" });
    }
};

export const obtenerUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuarioRepository.obtenerPorId(id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario por ID" });
    }
};

export const editarUsuario = async (req, res) => {
    const { id } = req.params;
    const datos = req.body;
    try {
        const usuario = await usuarioRepository.obtenerPorId(id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        const { Nombre, Apellido, Email, Password, Plan } = datos;
        if (Nombre) usuario.Nombre = Nombre;
        if (Apellido) usuario.Apellido = Apellido;
        if (Email && !(await usuarioRepository.obtenerPorEmail(Email))) usuario.Email = Email;
        if (Password) {
            const hashPassword = await bcrypt.hash(Password, 10);
            usuario.Password = hashPassword;
        }
        if (Plan) usuario.Plan = Plan;

        const usuarioActualizado = await usuarioRepository.editarUsuario(id, usuario);
        if (!usuarioActualizado) {
            return res.status(404).json({ error: "No se pudo actualizar al usuario." });
        }
        res.status(200).json(usuarioActualizado.select('-Password -MetodoPago -FechaUltimoPago'));
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};

export const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuarioEliminado = await usuarioRepository.eliminarUsuario(id);
        if (!usuarioEliminado) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};

export const pagar = async (req, res) => {
    const { MetodoPago } = req.body;
    const id = req.usuario.id;

    try {
        const usuario = await usuarioRepository.obtenerPorId(id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const data = {
            MetodoPago: MetodoPago,
            Plan: 'premium',
            FechaPago: new Date()
        }

        await usuarioRepository.editarUsuario(id, data);

        res.status(200).json({ message: "Pago procesado con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al procesar el pago" });
    }
}