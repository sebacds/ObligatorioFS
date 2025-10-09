import Mascota from '../model/mascota.mjs';

const mascotaRepository = {

    async crearMascota(data) {
        return await new Mascota(data).save();
    },

    async obtenerMascotas() {
        return await Mascota.find().populate('propietario', '-password');
    },

    async obtenerPorId(id) {
        return await Mascota.findById(id).populate('propietario', '-password');
    },

    async obtenerPorPropietario(idPropietario) {
        return await Mascota.find({ propietario: idPropietario }).populate('propietario', '-password');
    },

    async editarMascota(id, data) { 
        return await Mascota.findByIdAndUpdate(id, data, { new: true }).populate('propietario', '-password');
    },

    async eliminarMascota(id) {
        return await Mascota.delete({ _id: id });
    },

    async contarPorPropietario(idPropietario) {
        return await Mascota.countDocuments({ propietario: idPropietario });
    }
};

export default mascotaRepository;