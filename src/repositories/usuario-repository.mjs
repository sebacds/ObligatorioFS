import Usuario from "../model/usuario.mjs";

const usuarioRepository = {
    async crearUsuario(data) {
        return await new Usuario(data).save();
    },

    async obtenerPorEmail(email) {
        return await Usuario.findOne({ Email: email });
    },

    async obtenerPorId(id) {
        return await Usuario.findById(id);
    },

    async editarUsuario(id, data) {
        return await Usuario.findByIdAndUpdate(id, data, { new: true });
    },

    async eliminarUsuario(id) {
        return await Usuario.delete(id);
    }
};

export default usuarioRepository;