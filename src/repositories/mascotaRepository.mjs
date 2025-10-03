import Mascota from '../models/mascota.mjs';

const mascotaRepository = {
    async crearMascota(data) {
        try { 
            const mascota = new Mascota(data);
            const mascotaGuardada = await mascota.save();
            return mascotaGuardada;
        }catch (error) {
            console.error("Error al crear mascota:", error);
        }
    },

    async obtenerMascotaPorId(id) {
        try{
            return await Mascota.findById(id).populate('Propietario', '-Password');
        }catch (error) {
            console.error("Error al obtener mascota por ID:", error);
        }
    },

    async obtenerMascotaPorPropietario(propietarioId) {
        try{
            return await Mascota.find({ Propietario: propietarioId }).populate('Propietario', '-Password');
        }catch (error) {
            console.error("Error al obtener mascota por propietario:", error);
        }
    },

    async actualizarMascota(id, data) {
        try {
            const mascotaActualizada = await Mascota.findOneAndUpdate(
                { _id: id },
                { $set: data },
                { new: true }
            ).populate('Propietario', '-Password');
            return mascotaActualizada;
        } catch (error) {
            console.error("Error al actualizar mascota:", error);
        }
    },

    async eliminarMascota(id) {
        try {
            const mascotaEliminada = await Mascota.delete({ _id: id });
            return mascotaEliminada;
        } catch (error) {
            console.error("Error al eliminar mascota:", error);
        }
    }
};

export default mascotaRepository;