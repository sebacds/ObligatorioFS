import Usuario from "../models/usuario.mjs";

const usuarioRepository = {
    async crearUsuario(data) {
        try {
            const us = new Usuario(data);
            const usuarioGuardado = await us.save();
            delete usuarioGuardado._doc.Password;
            return usuarioGuardado;
        } catch (error) {
            console.error("Error al crear usuario:", error);
        }
    },

    async obtenerPorEmail(email) {
        try {
            return await Usuario.findOne({ Email: email });
        } catch (error) {
            console.error("Error al obtener usuario por email:", error);
        }
    },

    async obtenerPorId(id) {
        try {
            return await Usuario.findById(id);
        } catch (error) {
            console.error("Error al obtener usuario por ID:", error);
        }
    },

    async editarUsuario(data) {
        try {
            const usuarioActualizado = await Usuario.findOneAndUpdate(
                { _id: data._id },              
                { $set: data },
                {
                    new: true
                }
            );
            return usuarioActualizado;
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            throw error;
        }
    },

    async eliminarUsuario(id) {
        try {
            const usuarioEliminado = await Usuario.delete({ _id: id });
            return usuarioEliminado;
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    }
};

export default usuarioRepository;
