import Cita from '../models/cita.mjs';

const citaRepository = {

    async crearCita(data) {
        try { 
            const cita = new Cita(data);
            const citaGuardada = await cita.save();
            return citaGuardada;
        }catch (error) {
            console.error("Error al crear cita:", error);
        }
    },

    async obtenerPorId(id) {
        try{
            return await Cita.findById(id)
            .populate('Propietario', '-Password');
        }catch (error) {
            console.error("Error al obtener cita por ID:", error);
        }
    },

    async obtenerPorPropietario(propietarioId) {
        try{
            return await Cita.find({ Propietario: propietarioId })
            .populate('Propietario', '-Password');
        }catch (error) {
            console.error("Error al obtener cita por propietario:", error);
        }
    },

    async obtenerPorFechas(fechaInicio, fechaFin) {
        try{
            return await Cita.find({
                Fecha: { $gte: fechaInicio, $lte: fechaFin }
            }).populate('Propietario', '-Password');
        }catch (error) {
            console.error("Error al obtener cita por fechas:", error);
        }
    },

    async obtenerPorMascota(mascotaId) {
        try{
            return await Cita.find({ Mascota: mascotaId }).populate('Propietario', '-Password');
        }catch (error) {
            console.error("Error al obtener cita por mascota:", error);
        }
    },

    async editarCita(id, data) {
        try{
            return await Cita.findByIdAndUpdate(id, data, { new: true });
        }catch (error) {
            console.error("Error al actualizar cita:", error);
        }
    },

    async eliminarCita(id) {
        try{
            return await Cita.findByIdAndDelete(id);
        }catch (error) {
            console.error("Error al eliminar cita:", error);
        }
    }
};

export default citaRepository;