import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const mascotaSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    fechaNacimiento: { 
        type: Date, 
        required: true 
    },
    propietario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    categoria: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Categoria', 
        required: true 
    },
}, { timestamps: true })

mascotaSchema.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})

mascotaSchema.index({ nombre: 1, propietario: 1 }, { unique: true });

export default mascotaSchema;