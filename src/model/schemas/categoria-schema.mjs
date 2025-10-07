import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const categoriaSchema = new mongoose.Schema({
    Nombre: { type: String, required: true }
}, { timestamps: true })

categoriaSchema.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})

export default categoriaSchema;
