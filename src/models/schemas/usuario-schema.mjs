import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const usuarioSchema = new mongoose.Schema({
    Nombre: { type: String, required: true, minLength: 3, match: [/^[\p{L}\s]+$/u, 'El nombre solo puede contener letras'] },
    Apellido: { type: String, required: true, minLength: 3, match: [/^[\p{L}\s]+$/u, 'El apellido solo puede contener letras'] },
    Email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email inválido'] },
    Password: { type: String, required: true, minLength: 8 },
    Rol: { type: String, enum: ['admin', 'propietario'], default: 'propietario' },
    Plan: { type: String, enum: ['plus', 'premium'], required: () => {
        return this.Rol == 'propietario';
    }, default: () => {
        return this.Rol == 'propietario' ? 'plus' : undefined;
    } },
    MetodoPago: { type: String, enum: ['debito', 'credito'], default: null },
    FechaUltimoPago: { type: Date, default: null }
}, { timestamps: true })

usuarioSchema.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})

usuarioSchema.virtual('mascotas', {
    ref: 'Mascota',
    localField: '_id',
    foreignField: 'Propietario'
})

usuarioSchema.virtual('citas', {
    ref: 'Cita',
    localField: '_id',
    foreignField: 'Propietario'
})

usuarioSchema.set('toJSON', { virtuals: true });
usuarioSchema.set('toObject', { virtuals: true });

usuarioSchema.index({ Email: 1 }, { unique: true });

export default mongoose.model("Usuario", usuarioSchema);