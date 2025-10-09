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

    async obtenerPorNombre(data) {
        return await Categoria.findOne({ nombre: data });
    },

    async editarCategoria(id, data) {
        return await Categoria.findByIdAndUpdate( id, data, { new: true } );
    },

    async eliminarCategoria(id) {
        return await Categoria.delete({ _id: id });
    },

    async obtenerPorNombre(nombre) {
        return await Categoria.findOne({ nombre });
    }
};

export default categoriaRepository;