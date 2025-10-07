import mascotaRepository from "../repositories/mascota-repository.mjs";

export const crearMascota = async (req, res) => {
    try {
        const { Nombre, FechaNacimiento, Categoria, Propietario } = req.body;
        
        // Validar que Propietario existe
        if (!Propietario || !Propietario._id) {
            return res.status(400).json({ error: "Propietario es requerido" });
        }
        
        // Obtener mascotas del propietario usando el repository
        const mascotasProp = await mascotaRepository.obtenerPorPropietario(Propietario._id);
        
        // Verificar duplicados
        if(mascotasProp && mascotasProp.find(m => 
            m.Nombre === Nombre && 
            m.FechaNacimiento === FechaNacimiento && 
            m.Categoria === Categoria
        )){
            return res.status(409).json({ error: "La mascota ya existe para este propietario" });
        }
        
        const mascotaCreada = await mascotaRepository.crearMascota({Nombre, FechaNacimiento, Categoria, Propietario});
        res.status(201).json(mascotaCreada);
    } catch (error) {
        console.error("Error al crear mascota:", error);
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
        const { Nombre, FechaNacimiento, Categoria, Propietario } = req.body;
        const mascota = await mascotaRepository.obtenerPorId(id);
        if (!mascota) {
            return res.status(404).json({ error: "Mascota no encontrada" });
        }
        if (Nombre) mascota.Nombre = Nombre;
        if (FechaNacimiento) mascota.FechaNacimiento = FechaNacimiento;
        if (Categoria) mascota.Categoria = Categoria;
        if (Propietario) mascota.Propietario = Propietario;

        const mascotaActualizada = await mascotaRepository.editarMascota(id, mascota);
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
        if (!await mascotaRepository.eliminarMascota(id)) {
            return res.status(404).json({ error: "Mascota no encontrada" });
        }
        res.status(200).json({ message: "Mascota eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la mascota" });
    }
};
