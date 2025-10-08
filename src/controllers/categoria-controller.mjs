import categorias from '../repositories/categoria-repository.mjs';

export const crearCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;

        const categoriaExistente = await categorias.obtenerPorNombre(nombre);
        if (categoriaExistente) {
            return res.status(409).json({ error: 'Ya existe una categoría con ese nombre' });
        }

        const categoria = await categorias.crearCategoria({ nombre });
        res.status(201).json(categoria);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
};

export const obtenerCategorias = async (req, res) => {
    try {
        res.status(200).json(await categorias.obtenerCategorias());
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
};

export const editarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const categoria = await categorias.obtenerPorId(id);
        if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });

        if (nombre) {
            const buscarNombre = await categorias.obtenerPorNombre(nombre);
            if (buscarNombre && buscarNombre._id.toString() != id) {
                return res.status(409).json({ error: 'Ya existe una categoría con ese nombre' });
            }
        }

        const actualizada = await categorias.editarCategoria(id, { nombre });
        res.status(200).json(actualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al editar la categoría' });
    }
};

export const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const categoria = await categorias.obtenerPorId(id);
        if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });

        await categorias.eliminarCategoria(id);
        res.status(200).json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
};