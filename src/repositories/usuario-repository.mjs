import Usuario from '../model/usuario.mjs';

const usuarioRepository = {
    async crearUsuario(data) {
        return await new Usuario(data).save();
    },

    async obtenerPorEmail(email) {
        return await Usuario.findOne({ email }).select('+password');
    },

    async obtenerPorId(id) {
        return await Usuario.findById(id);
    },

    async editarUsuario(id, data) {
        return await Usuario.findByIdAndUpdate(id, data, { new: true });
    },

    async eliminarUsuario(id) {
        return await Usuario.delete(id);
    },

    async obtenerUsuarios() {
        return await Usuario.find();
    }
};

export default usuarioRepository;