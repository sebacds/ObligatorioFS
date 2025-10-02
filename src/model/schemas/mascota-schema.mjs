import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const mascotaSchema = new mongoose.Schema({
    Nombre: { type: String, required: true },
    FechaNacimiento: { type: Date, required: true },
    Propietario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    Categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
}, { timestamps: true })

mascotaSchema.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})

mascotaSchema.index({ Nombre: 1, Propietario: 1 }, { unique: true });

export default mongoose.model("Mascota", mascotaSchema);