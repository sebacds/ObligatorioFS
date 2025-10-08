import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const categoriaSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        unique: true,
        required: true 
    }
}, { timestamps: true })

categoriaSchema.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})

export default categoriaSchema;
