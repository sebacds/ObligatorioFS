import Categoria from '../model/categoria.mjs';

const categoriaRepository = {

    async crearCategoria(data) {
        return await new Categoria(data).save();
    },

    async obtenerPorId(id) {
        return await Categoria.findById(id);
    },

    async obtenerCategorias() {
        return await Categoria.find();
    },

    async editarCategoria(id, data) {
        return await Categoria.findByIdAndUpdate( id, data, { new: true } );
    },

    async eliminarCategoria(id) {
        return await Categoria.delete(id);
    }
};

export default categoriaRepository;