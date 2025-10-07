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

    async obtenerMascotas() {
        try{
            return await Mascota.find().populate('Propietario', '-Password');
        }catch (error) {
            console.error("Error al obtener mascotas:", error);
        }
    },

    async obtenerPorId(id) {
        try{
            return await Mascota.findById(id).populate('Propietario', '-Password');
        }catch (error) {
            console.error("Error al obtener mascota por ID:", error);
        }
    },

    async obtenerPorPropietario(propietarioId) {
        try{
            return await Mascota.find({ Propietario: propietarioId }).populate('Propietario', '-Password');
        }catch (error) {
            console.error("Error al obtener mascota por propietario:", error);
        }
    },

    async editarMascota(data) { 
        try {
            const { id, mascota } = data;
            const mascotaActualizada = await Mascota.findOneAndUpdate(
                { _id: id },
                { $set: mascota },
                { new: true }
            ).populate('Propietario', '-Password');
            return mascotaActualizada;
        } catch (error) {
            console.error("Error al actualizar mascota:", error);
        }
    },

    async eliminarMascota(id) {
        try {            
            return await Mascota.findByIdAndDelete(id);
        } catch (error) {
            console.error("Error al eliminar mascota:", error);
        }
    }
};

export default mascotaRepository;