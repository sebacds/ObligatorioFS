import mongoose from 'mongoose';
import 'dotenv/config.js';

const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DB_NAME,
    BD_EN_USO,
    MONGO_ATLAS_USUARIO,
    MONGO_ATLAS_PASSWORD
} = process.env;

let mongoUri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`;

if (BD_EN_USO == 'atlas') {
    mongoUri = `mongodb+srv://${MONGO_ATLAS_USUARIO}:${MONGO_ATLAS_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
}

async function conectarMongo() {
    try {
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
            dbName: MONGO_DB_NAME
        });
    } catch (e) {
        console.error('Error al conectar a MongoDB: ', e);
        process.exit(1);
    }
}

export default conectarMongo;