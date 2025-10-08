
import mascotas from '../repositories/mascota-repository.mjs';
import usuarios from '../repositories/usuario-repository.mjs';
import categorias from '../repositories/categoria-repository.mjs';

export const crearMascota = async (req, res) => {
    try {
        const { Nombre, FechaNacimiento, Categoria } = req.body;
        const Propietario = req.usuario.rol == 'admin' ? req.body.Propietario : req.usuario.id;

        const propietario = await usuarios.obtenerPorId(Propietario);
        if (!propietario) return res.status(404).json({ error: 'Propietario no encontrado' });

        if (propietario.Plan == 'plus' && await mascotas.contarPorPropietario(Propietario) >= 10) {
            return res.status(403).json({ error: 'El propietario ha alcanzado el límite de mascotas para su plan' });
        }

        const categoria = await categorias.obtenerPorId(Categoria);
        if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });

        if (new Date(FechaNacimiento) > new Date()) {
            return res.status(400).json({ error: 'La fecha de nacimiento no puede ser en el futuro' });
        }

        const mascota = await mascotas.crearMascota({ Nombre, FechaNacimiento, Categoria, Propietario });
        res.status(201).json(mascota);

    } catch (error) {
        console.error("Error al crear mascota:", error);
        res.status(500).json({ error: "Error al crear la mascota" });
    }
}

export const obtenerMascotasPropias = async (req, res) => {
    try {
        res.status(200).json(await mascotas.obtenerPorPropietario(req.usuario.id));
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las mascotas" });
    }
}

export const obtenerMascotaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const mascota = await mascotas.obtenerPorId(id);
        if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada' });

        if (req.usuario.rol != 'admin' && mascota.Propietario._id.toString() != req.usuario.id) {
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
        const { Nombre, FechaNacimiento, Categoria } = req.body;

        const mascota = await mascotas.obtenerPorId(id);
        if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada' });

        if (req.usuario.rol != 'admin' && mascota.Propietario._id.toString() != req.usuario.id) {
            return res.status(403).json({ error: 'No tenes permiso para editar esta mascota' });
        }

        const data = {};

        if (Nombre) data.Nombre = Nombre;

        if (FechaNacimiento) {
            if (new Date(FechaNacimiento) > new Date()) {
                return res.status(400).json({ error: 'La fecha de nacimiento no puede ser en el futuro' });
            }

            data.FechaNacimiento = FechaNacimiento;
        }
        
        if (Categoria) {
            const categoria = await categorias.obtenerPorId(Categoria);
            if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });

            data.Categoria = Categoria;
        }

        res.status(200).json(await mascotas.editarMascota(id, data));
    } catch (error) {
        res.status(500).json({ error: 'Error al editar la mascota' });
    }
}

export const eliminarMascota = async (req, res) => {
    try {
        const { id } = req.params;

        const mascota = await mascotas.obtenerPorId(id);
        if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada' });

        if (req.usuario.rol != 'admin' && mascota.Propietario._id.toString() != req.usuario.id) {
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
        const mascotas = await mascotas.obtenerPorPropietario(req.params.id);
        res.status(200).json(mascotas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las mascotas del propietario' });
    }
}