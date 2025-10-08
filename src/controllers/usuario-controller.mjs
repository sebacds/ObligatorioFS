import usuarios from '../repositories/usuario-repository.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const crearUsuario = async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body;

        if (await usuarios.obtenerPorEmail(email)) {
            return res.status(409).json({ error: 'El email ya está en uso' });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        
        const usuario = await usuarios.crearUsuario({ nombre, apellido, email, password: hashPassword });

        const token = jwt.sign({ id: usuario._id, email: usuario.email, rol: usuario.rol, plan: usuario.plan }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ usuario, token });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }   
}

export const obtenerPerfil = async (req, res) => {
    try {
        const usuario = await usuarios.obtenerPorId(req.usuario.id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el perfil' });
    }
}

export const editarPerfil = async (req, res) => {
    try {
        const usuario = await usuarios.obtenerPorId(req.usuario.id);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        const { nombre, apellido, email, passwordActual, passwordNueva } = req.body;
        const data = {};

        if (email) {
            const buscarEmail = await usuarios.obtenerPorEmail(email);

            if (buscarEmail && buscarEmail._id.toString() != req.usuario.id) {
                return res.status(409).json({ error: 'El email ya está en uso' });
            }

            data.email = email;
        }

        if (!passwordActual && passwordNueva) {
            return res.status(400).json({ error: 'Para cambiar la contraseña, debes proporcionar la contraseña actual.' });
        } else if (passwordActual && passwordNueva && !(await bcrypt.compare(passwordActual, usuario._doc.password))) {
            return res.status(401).json({ error: 'La contraseña actual es incorrecta.' });
        } else if (passwordNueva) {
            data.password = await bcrypt.hash(passwordNueva, 10);
        }

        if (nombre) data.nombre = nombre;
        if (apellido) data.apellido = apellido;

        const actualizado = await usuarios.editarUsuario(req.usuario.id, data);
        res.status(200).json(actualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al editar el perfil' });
    }
}

export const eliminarPerfil = async (req, res) => {
    try {
        await usuarios.eliminarUsuario(req.usuario.id);
        res.status(200).json({ message: 'Perfil eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar perfil' });
    }
}

export const obtenerUsuarios = async (req, res) => {
    try {
        res.status(200).json(await usuarios.obtenerUsuarios());
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}

export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await usuarios.obtenerPorId(req.params.id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario por ID' });
    }
}

export const editarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await usuarios.obtenerPorId(id);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        const { nombre, apellido, email } = req.body;
        const data = {};

        if (email) {
            const buscarEmail = await usuarios.obtenerPorEmail(email);

            if (buscarEmail && buscarEmail._id.toString() != id) {
                return res.status(409).json({ error: 'El email ya está en uso' });
            }

            data.email = email;
        }

        if (nombre) data.nombre = nombre;
        if (apellido) data.apellido = apellido;

        const actualizado = await usuarios.editarUsuario(id, data);
        res.status(200).json(actualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al editar el usuario' });
    }
}

export const eliminarUsuarioPorId = async (req, res) => {
    try {
        const usuario = await usuarios.obtenerPorId(req.params.id);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        
        await usuarios.eliminarUsuario(req.params.id);
        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
}

export const pagar = async (req, res) => {
    try {
        const { metodoPago } = req.body;
        const id = req.usuario.id;

        const usuario = await usuarios.obtenerPorId(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const data = {
            metodoPago,
            plan: 'premium',
            fechaPago: new Date()
        }

        const actualizado = await usuarios.editarUsuario(id, data);

        const token = jwt.sign({ id: actualizado._id, email: actualizado.email, rol: actualizado.rol, plan: actualizado.plan }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Pago procesado con éxito', usuario: actualizado, token });
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar el pago' });
    }
}