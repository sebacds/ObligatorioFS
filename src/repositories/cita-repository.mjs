import Cita from '../model/cita.mjs';

const citaRepository = {

    async crearCita(data) {
        return await new Cita(data).save();
    },

    async obtenerPorId(id) {
        return await Cita.findById(id).populate('Propietario', '-Password');
    },

    async obtenerPorPropietario(idPropietario) {
        return await Cita.find({ Propietario: idPropietario }).populate('Propietario', '-Password');
    },

    async obtenerPorFechas(data) {
        const { fechaInicio, fechaFin } = data;
        return await Cita.find({ Fecha: { $gte: fechaInicio, $lte: fechaFin } }).populate('Propietario', '-Password');
    },

    async obtenerPorMascota(idMascota) {
        return await Cita.find({ Mascota: idMascota }).populate('Propietario', '-Password');
    },

    async editarCita(id, data) {
        return await Cita.findByIdAndUpdate(id, data, { new: true });
    },

    async eliminarCita(id) {
        return await Cita.delete(id);
    }
};

export default citaRepository;