import Usuario from "../models/Usuario.mjs";

const usuarioRepository = {
    async crearUsuario(data) {
        try {
            const us = new Usuario(data);
            const usuarioGuardado = await us.save();
            delete usuarioGuardado._doc.Password;
            return usuarioGuardado;
        } catch (error) {
            console.error("Error al crear usuario:");
        }
    },

    async obtenerUsuarioPorEmail(email) {
        try {
            return await Usuario.findOne({ Email: email });
        } catch (error) {
            console.error("Error al obtener usuario por email:", error);
        }
    },

    async 
};
