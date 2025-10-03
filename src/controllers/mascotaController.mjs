import mascotaRepository from "../repositories/mascotaRepository.mjs";

export const crearMascota = async (req, res) => {
    try {
        const nuevaMascota = req.body;
        const mascotaCreada = await mascotaRepository.crearMascota(nuevaMascota);
        res.status(201).json(mascotaCreada);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la mascota" });
    }
};

export const obtenerMascotaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const mascota = await mascotaRepository.obtenerPorId(id);
        if (!mascota) {
            return res.status(404).json({ error: "Mascota no encontrada" });
        }
        res.status(200).json(mascota);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la mascota" });
    }
};

export const obtenerMascotasPorPropietario = async (req, res) => {
    try {
        const { propietarioId } = req.params;
        const mascotas = await mascotaRepository.obtenerPorPropietario(propietarioId);
        if (!mascotas || mascotas.length === 0) {
            return res.status(404).json({ error: "No se encontraron mascotas para este propietario" });
        }
        res.status(200).json(mascotas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las mascotas del propietario" });
    }
};

export const editarMascota = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const mascotaActualizada = await mascotaRepository.editarMascota(id, datosActualizados);
        if (!mascotaActualizada) {
            return res.status(404).json({ error: "Mascota no encontrada" });
        }
        res.status(200).json(mascotaActualizada);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la mascota" });
    }
};

export const eliminarMascota = async (req, res) => {
    try {
        const { id } = req.params;
        const mascotaEliminada = await mascotaRepository.eliminarMascota(id);
        if (!mascotaEliminada) {
            return res.status(404).json({ error: "Mascota no encontrada" });
        }
        res.status(200).json({ message: "Mascota eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la mascota" });
    }
};
