import citaRepository from "../repositories/citaRepository.mjs";

export const crearCita = async (req, res) => {
    try {
        const nuevaCita = await citaRepository.crearCita(req.body);
        res.status(201).json(nuevaCita);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la cita" });
    }
};

export const obtenerCitasPorPropietario = async (req, res) => {
    const { propietarioId } = req.params;
    try {
        const citas = await citaRepository.obtenerPorPropietario(propietarioId);
        if (!citas || citas.length === 0) {
            return res.status(404).json({ error: "No se encontraron citas para este propietario" });
        }
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las citas del propietario" });
    }
};

export const obtenerCitasPorFechas = async (req, res) => {
    const { fechaInicio, fechaFin } = req.query;
    try {
        const citas = await citaRepository.obtenerPorFechas(fechaInicio, fechaFin);
        if (!citas || citas.length === 0) {
            return res.status(404).json({ error: "No se encontraron citas en este rango de fechas" });
        }
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las citas por fechas" });
    }
};

export const obtenerCitaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const cita = await citaRepository.obtenerPorId(id);
        if (!cita) {
            return res.status(404).json({ error: "Cita no encontrada" });
        }
        res.status(200).json(cita);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la cita por ID" });
    }
};

export const obtenerCitasPorMascota = async (req, res) => {
    const { mascotaId } = req.params;
    try {
        const citas = await citaRepository.obtenerPorMascota(mascotaId);
        if (!citas || citas.length === 0) {
            return res.status(404).json({ error: "No se encontraron citas para esta mascota" });
        }
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las citas de la mascota" });
    }
};

export const editarCita = async (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;
    try {
        const citaActualizada = await citaRepository.editarCita(id, datosActualizados);
        if (!citaActualizada) {
            return res.status(404).json({ error: "Cita no encontrada" });
        }
        res.status(200).json(citaActualizada);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la cita" });
    }
};

export const eliminarCita = async (req, res) => {
    const { id } = req.params;
    try {
        const citaEliminada = await citaRepository.eliminarCita(id);
        if (!citaEliminada) {
            return res.status(404).json({ error: "Cita no encontrada" });
        }
        res.status(200).json({ message: "Cita eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la cita" });
    }
};
