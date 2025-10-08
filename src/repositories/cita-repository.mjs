import Cita from '../model/cita.mjs';

const citaRepository = {

    async crearCita(data) {
        return await new Cita(data).save();
    },

    async obtenerPorId(id) {
        return await Cita.findById(id).populate('propietario', '-password');
    },

    async obtenerPorPropietario(idPropietario) {
        return await Cita.find({ propietario: idPropietario }).populate('propietario', '-password');
    },

    async obtenerPorFechas(data) {
        const { fechaInicio, fechaFin } = data;
        return await Cita.find({ fecha: { $gte: fechaInicio, $lte: fechaFin } }).populate('propietario', '-password');
    },

    async obtenerPorMascota(idMascota) {
        return await Cita.find({ mascota: idMascota }).populate('propietario', '-password');
    },

    async editarCita(id, data) {
        return await Cita.findByIdAndUpdate(id, data, { new: true });
    },

    async eliminarCita(id) {
        return await Cita.delete(id);
    },

    async obtenerCitas() {
        return await Cita.find();
    }
};

export default citaRepository;