import categoriaRepository from "../repositories/categoriaRepository.mjs";

export const crearCategoria = async (req, res) => {
    const { nombre } = req.body;
    try {
        const nuevaCategoria = await categoriaRepository.crearCategoria({ nombre });
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la categoría" });
    }
};

export const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await categoriaRepository.obtenerCategorias();
        if (!categorias || categorias.length === 0) {
            return res.status(404).json({ error: "No se encontraron categorías" });
        }
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las categorías" });
    }
};

export const editarCategoria = async (req, res) => {
    const data = req.body;
    try {
        const categorias = await categoriaRepository.obtenerCategorias();
        const categoriaExistente = categorias.find(c => c.nombre === data.nombre);
        if (categoriaExistente) {
            return res.status(409).json({ error: "La categoría ya existe" });
        }
        const categoriaActualizada = await categoriaRepository.editarCategoria(data);
        if (!categoriaActualizada) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        res.status(200).json(categoriaActualizada);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la categoría" });
    }
};

export const eliminarCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const categoriaEliminada = await categoriaRepository.eliminarCategoria(id);
        if (!categoriaEliminada) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        res.status(200).json({ message: "Categoría eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la categoría" });
    }
};
