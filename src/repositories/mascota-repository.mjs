import Mascota from '../model/mascota.mjs';

const mascotaRepository = {

    async crearMascota(data) {
        return await new Mascota(data).save();
    },

    async obtenerMascotas() {
        return await Mascota.find().populate('Propietario', '-Password');
    },

    async obtenerPorId(id) {
        return await Mascota.findById(id).populate('Propietario', '-Password');
    },

    async obtenerPorPropietario(idPropietario) {
        return await Mascota.find({ Propietario: idPropietario }).populate('Propietario', '-Password');
    },

    async editarMascota(id, data) { 
        return await Mascota.findByIdAndUpdate(id, data, { new: true }).populate('Propietario', '-Password');
    },

    async eliminarMascota(id) {
        return await Mascota.delete(id);
    }
};

export default mascotaRepository;