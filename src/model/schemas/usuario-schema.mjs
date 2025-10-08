import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const usuarioSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true, 
        minlength: 3, 
        match: [/^[\p{L}\s]+$/u, 'El nombre solo puede contener letras'] 
    },
    apellido: { 
        type: String, 
        required: true, 
        minlength: 3, 
        match: [/^[\p{L}\s]+$/u, 'El apellido solo puede contener letras'] 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true, 
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email inválido'] 
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 8,
        select: false
    },
    rol: { 
        type: String, 
        enum: ['admin', 'propietario'], 
        default: 'propietario' 
    },
    plan: { 
        type: String, 
        enum: ['plus', 'premium'], 
        required: function() {
            return this.rol == 'propietario';
        }, 
        default: function() {
            return this.rol == 'propietario' ? 'plus' : undefined;
        } 
    },
    metodoPago: { 
        type: String, 
        enum: ['debito', 'credito'], 
        default: null 
    },
    fechaPago: { 
        type: Date, 
        default: null 
    }
}, { timestamps: true })

usuarioSchema.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})

usuarioSchema.virtual('mascotas', {
    ref: 'Mascota',
    localField: '_id',
    foreignField: 'propietario'
})

usuarioSchema.virtual('citas', {
    ref: 'Cita',
    localField: '_id',
    foreignField: 'propietario'
})

const opciones = {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
    }
}

usuarioSchema.set('toJSON', opciones);
usuarioSchema.set('toObject', opciones);

export default usuarioSchema;