
import citas from '../repositories/cita-repository.mjs';
import mascotas from '../repositories/mascota-repository.mjs';
import usuarios from '../repositories/usuario-repository.mjs';

export const crearCita = async (req, res) => {
    try {
        const { propietario, mascota, fecha, motivo } = req.body;
        const propietarioId = req.usuario.rol == 'admin' ? propietario : req.usuario.id;

        const buscarPropietario = await usuarios.obtenerPorId(propietarioId);
        if (!buscarPropietario) return res.status(404).json({ error: 'Propietario no encontrado' });

        const buscarMascota = await mascotas.obtenerPorId(mascota);
        if (!buscarMascota) return res.status(404).json({ error: 'Mascota no encontrada' });

        const verificarCita = await citas.obtenerPorFechas({ fechaInicio: new Date(new Date(fecha).setHours(0,0,0,0)), fechaFin: new Date(new Date(fecha).setHours(23,59,59,999)) });
        if (verificarCita.find(cita => cita.mascota._id.toString() == mascota && cita.propietario._id.toString() == propietarioId)) {
            return res.status(409).json({ error: 'Ya existe una cita para esta mascota y propietario en la fecha indicada' });
        }

        const cita = await citas.crearCita({ propietario: propietarioId, mascota, fecha, motivo });
        res.status(201).json(cita);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la cita' });
    }
}

export const obtenerCitasPropias = async (req, res) => {
    try {
        res.status(200).json(await citas.obtenerPorPropietario(req.usuario.id));
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las citas' });
    }
}

export const obtenerCitasPorMascota = async (req, res) => {
    try {
        const { id } = req.params;

        const mascota = await mascotas.obtenerPorId(id);
        if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada' });

        if (req.usuario.rol != 'admin' && mascota.propietario._id.toString() != req.usuario.id) {
            return res.status(403).json({ error: 'No tenes permiso para ver las citas de esta mascota' });
        }

        res.status(200).json(await citas.obtenerPorMascota(id));
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las citas por mascota' });
    }
}

export const obtenerCitaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const cita = await citas.obtenerPorId(id);
        if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });

        if (req.usuario.rol != 'admin' && cita.propietario._id.toString() != req.usuario.id) {
            return res.status(403).json({ error: 'No tenes permiso para ver esta cita' });
        }

        res.status(200).json(cita);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la cita por ID' });
    }
}

export const cancelarCita = async (req, res) => {
    try {
        const { id } = req.params;

        const cita = await citas.obtenerPorId(id);
        if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });

        if (req.usuario.rol != 'admin' && cita.propietario._id.toString() != req.usuario.id) {
            return res.status(403).json({ error: 'No tenes permiso para cancelar esta cita' });
        }

        if (cita.estado == 'cancelada') {
            return res.status(400).json({ error: 'La cita ya está cancelada' });
        }

        const actualizada = await citas.editarCita(id, { estado: 'cancelada' })
        res.status(200).json({ message: 'La cita se canceló correctamente', cita: actualizada });
    } catch (error) {
        res.status(500).json({ error: 'Error al cancelar la cita' });
    }
}

export const obtenerCitasPorPropietario = async (req, res) => {
    try {
        const { id } = req.params;

        const propietario = await usuarios.obtenerPorId(id);
        if (!propietario) return res.status(404).json({ error: 'Propietario no encontrado' });

        res.status(200).json(await citas.obtenerPorPropietario(id));
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las citas del propietario' });
    }
}

export const editarCita = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const estadosValidos = ['aceptada', 'cancelada', 'rechazada', 'finalizada'];
        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({ error: 'Estado no válido' });
        }

        const cita = await citas.obtenerPorId(id);
        if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });

        if (req.usuario.rol != 'admin' && cita.propietario._id.toString() != req.usuario.id) {
            return res.status(403).json({ error: 'No tenes permiso para editar esta cita' });
        }

        if (cita.estado == estado) {
            return res.status(400).json({ error: `La cita ya está ${estado}` });
        }

        const actualizada = await citas.editarCita(id, { estado });
        res.status(200).json({ message: 'El estado se actualizó correctamente', cita: actualizada });
    } catch (error) {
        res.status(500).json({ error: 'Error al editar la cita' });
    }
}

export const obtenerCitas = async (req, res) => {
    try {
        res.status(200).json(await citas.obtenerCitas());
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las citas' });
    }
}