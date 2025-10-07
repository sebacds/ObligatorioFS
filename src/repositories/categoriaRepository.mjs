import Categoria from '../models/categoria.mjs';

const categoriaRepository = {

    async crearCategoria(data) {
        try {
            const categoria = new Categoria(data);
            const categoriaGuardada = await categoria.save();
            return categoriaGuardada;
        } catch (error) {
            console.error("Error al crear categoria:", error);
        }
    },

    async obtenerPorId(id) {
        try {
            return await Categoria.findById(id);
        } catch (error) {
            console.error("Error al obtener categoria por ID:", error);
        }
    },

    async obtenerCategorias() {
        try {
            return await Categoria.find();
        } catch (error) {
            console.error("Error al obtener todas las categorias:", error);
        }
    },

    async editarCategoria(data) {
        try {
            const { id, categoria } = data;
            const categoriaActualizada = await Categoria.findOneAndUpdate(
                { _id: id },
                { $set: categoria },
                { new: true }
            );
            return categoriaActualizada;
        } catch (error) {
            console.error("Error al actualizar categoria:", error);
        }
    },

    async eliminarCategoria(id) {
        try {
            const categoriaEliminada = await Categoria.findByIdAndDelete(id);
            return categoriaEliminada;
        } catch (error) {
            console.error("Error al eliminar categoria:", error);
        }
    }
};

export default categoriaRepository;
