import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const citaSchema = new mongoose.Schema({
    Propietario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, 
    Mascota: { type: mongoose.Schema.Types.ObjectId, ref: 'Mascota', required: true },
    Motivo: { type: String, required: true },
    Fecha: { type: Date, required: true },
    Estado: { type: String, enum: ['pendiente', 'aceptada', 'cancelada', 'rechazada', 'finalizada'], default: 'pendiente' },
}, { timestamps: true })

citaSchema.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})

citaSchema.index({ Propietario: 1, Mascota: 1, Fecha: 1 }, { unique: true });

export default citaSchema;
