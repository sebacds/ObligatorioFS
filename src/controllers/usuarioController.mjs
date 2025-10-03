import usuarioRepository from "../repositories/usuarioRepository.mjs";

export const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await usuarioRepository.crearUsuario(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
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
    const { email } = req.params;
    try {
        const usuario = await usuarioRepository.obtenerPorEmail(email);
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
    const datosActualizados = req.body;
    try {
        const usuarioActualizado = await usuarioRepository.editarUsuario(id, datosActualizados);
        if (!usuarioActualizado) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(usuarioActualizado);
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
