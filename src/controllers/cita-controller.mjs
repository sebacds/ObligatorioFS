import citas from '../repositories/cita-repository.mjs';
import mascotas from '../repositories/mascota-repository.mjs';
import usuarios from '../repositories/usuario-repository.mjs';

export const crearCita = async (req, res) => {
    try {
        const { Propietario, Mascota, Fecha, Motivo } = req.body;
        const propietarioId = req.usuario.rol == 'admin' ? Propietario : req.usuario.id;

        const propietario = await usuarios.obtenerPorId(propietarioId);
        if (!propietario) return res.status(404).json({ error: 'Propietario no encontrado' });

        const mascota = await mascotas.obtenerPorId(Mascota);
        if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada' });

        const verificarCita = await citas.obtenerPorFechas({ fechaInicio: new Date(new Date(Fecha).setHours(0,0,0,0)), fechaFin: new Date(new Date(Fecha).setHours(23,59,59,999)) });
        if (verificarCita.find(cita => cita.Mascota._id.toString() == Mascota && cita.Propietario._id.toString() == (propietarioId))) {
            return res.status(409).json({ error: 'Ya existe una cita para esta mascota y propietario en la fecha indicada' });
        }

        const cita = await citas.crearCita({ Propietario: propietarioId, Mascota, Fecha, Motivo });
        res.status(201).json(cita);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la cita' });
    }
}

export const obtenerCitasPropias = async (req, res) => {
    try {
        res.status(200).json(await citas.obtenerPorId(req.usuario.id));
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las citas' });
    }
}

export const obtenerCitasPorMascota = async (req, res) => {
    try {
        const { id } = req.params;

        const mascota = await mascotas.obtenerPorId(id);
        if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada' });

        if (req.usuario.rol != 'admin' && mascota.Propietario.toString() != req.usuario.id) {
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

        if (req.usuario.rol != 'admin' && cita.Propietario._id.toString() != req.usuario.id) {
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

        if (req.usuario.rol != 'admin' && cita.Propietario._id.toString() != req.usuario.id) {
            return res.status(403).json({ error: 'No tenes permiso para ver esta cita' });
        }

        if (cita.Estado == 'cancelada') {
            return res.status(400).json({ error: 'La cita ya está cancelada' });
        }

        await citas.editarCita(id, { Estado: 'cancelada' })
        res.status(200).json('La cita se canceló correctamente');
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
        const { Estado } = req.body;

        const estadosValidos = ['aceptada', 'cancelada', 'rechazada', 'finalizada'];
        if (!estadosValidos.includes(Estado)) {
            return res.status(400).json({ error: 'Estado no válido' });
        }

        const cita = await citas.obtenerPorId(id);
        if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });

        if (req.usuario.rol != 'admin' && cita.Propietario._id.toString() != req.usuario.id) {
            return res.status(403).json({ error: 'No tenes permiso para editar esta cita' });
        }

        if (cita.Estado == Estado) {
            return res.status(400).json({ error: `La cita ya está ${Estado}` });
        }

        await citas.editarCita(id, { Estado });
        res.status(200).json('El estado se actualizó correctamente');
    } catch (error) {
        res.status(500).json({ error: 'Error al cancelar la cita' });
    }
}