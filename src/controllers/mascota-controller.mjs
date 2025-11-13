
import mascotas from '../repositories/mascota-repository.mjs';
import usuarios from '../repositories/usuario-repository.mjs';
import categorias from '../repositories/categoria-repository.mjs';

export const crearMascota = async (req, res) => {
    try {
        const { nombre, fechaNacimiento, categoria, foto } = req.body;
        const propietario = req.usuario.rol == 'admin' ? req.body.propietario : req.usuario.id;

        const propietarioDoc = await usuarios.obtenerPorId(propietario);
        if (!propietarioDoc) return res.status(404).json({ error: 'Propietario no encontrado' });

        if (propietarioDoc.plan == 'plus' && await mascotas.contarPorPropietario(propietario) >= 10) {
            return res.status(403).json({ error: 'El propietario ha alcanzado el límite de mascotas para su plan' });
        }

        const categoriaDoc = await categorias.obtenerPorId(categoria);
        if (!categoriaDoc) return res.status(404).json({ error: 'Categoría no encontrada' });

        if (new Date(fechaNacimiento) > new Date()) {
            return res.status(400).json({ error: 'La fecha de nacimiento no puede ser en el futuro' });
        }

        const mascota = await mascotas.crearMascota({ nombre, fechaNacimiento, categoria, propietario, foto });
        res.status(201).json(mascota);

    } catch (error) {
        res.status(500).json({ error: 'Error al crear la mascota' });
    }
}

export const obtenerMascotasPropias = async (req, res) => {
    try {
        res.status(200).json(await mascotas.obtenerPorPropietario(req.usuario.id));
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las mascotas' });
    }
}

export const obtenerMascotaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const mascota = await mascotas.obtenerPorId(id);
        if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada' });

        if (req.usuario.rol != 'admin' && mascota.propietario._id.toString() != req.usuario.id) {
            return res.status(403).json({ error: 'No tenes permiso para ver esta mascota' });
        }

        res.status(200).json(mascota);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la mascota por ID' });
    }
}

export const editarMascota = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, fechaNacimiento, categoria, foto } = req.body;

        const mascota = await mascotas.obtenerPorId(id);
        if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada' });

        if (req.usuario.rol != 'admin' && mascota.propietario._id.toString() != req.usuario.id) {
            return res.status(403).json({ error: 'No tenes permiso para editar esta mascota' });
        }

        const data = {};

        if (nombre) data.nombre = nombre;

        if (fechaNacimiento) {
            if (new Date(fechaNacimiento) > new Date()) {
                return res.status(400).json({ error: 'La fecha de nacimiento no puede ser en el futuro' });
            }

            data.fechaNacimiento = fechaNacimiento;
        }
        
        if (categoria) {
            const buscarCategoria = await categorias.obtenerPorId(categoria);
            if (!buscarCategoria) return res.status(404).json({ error: 'Categoría no encontrada' });

            data.categoria = categoria;
        }

        if (foto) data.foto = foto;

        const actualizada = await mascotas.editarMascota(id, data);
        res.status(200).json(actualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al editar la mascota' });
    }
}

export const eliminarMascota = async (req, res) => {
    try {
        const { id } = req.params;

        const mascota = await mascotas.obtenerPorId(id);
        if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada' });

        if (req.usuario.rol != 'admin' && mascota.propietario._id.toString() != req.usuario.id) {
            return res.status(403).json({ error: 'No tenes permiso para eliminar esta mascota' });
        }

        await mascotas.eliminarMascota(id);
        res.status(200).json({ message: 'Mascota eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la mascota' });
    }
}

export const obtenerMascotasPorPropietario = async (req, res) => {
    try {
        const lista = await mascotas.obtenerPorPropietario(req.params.id);
        res.status(200).json(lista);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las mascotas del propietario' });
    }
}