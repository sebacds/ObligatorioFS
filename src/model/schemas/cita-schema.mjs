import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const citaSchema = new mongoose.Schema({
    propietario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    }, 
    mascota: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Mascota', 
        required: true 
    },
    motivo: { 
        type: String, 
        required: true 
    },
    fecha: { 
        type: Date, 
        required: true 
    },
    estado: { 
        type: String, 
        enum: ['pendiente', 'aceptada', 'cancelada', 'rechazada', 'finalizada'], 
        default: 'pendiente' 
        
    },
}, { timestamps: true })

citaSchema.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})

citaSchema.index({ propietario: 1, mascota: 1, fecha: 1 }, { unique: true });

export default citaSchema;
