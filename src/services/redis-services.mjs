import { redisClient } from '../config/redis-config.mjs';

const setValue = async (key, value, timeExpiration = null) => {
    try {
        const stringValue = JSON.stringify(value);

        if (timeExpiration) {
            await redisClient.setEx(key, timeExpiration, stringValue);
        } else {
            await redisClient.set(key, stringValue);
        }
    } catch (e) {
        console.error('No se pudo setear el valor', e);
    }
}

const getValue = async (key) => {
    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('No se pudo obtener el valor', e);
    }
}

const deleteValue = async (key) => {
    try {
        await redisClient.del(key);
    } catch (e) {
        console.error('No se pudo borrar el valor', e);
    }
}

export { setValue, getValue, deleteValue };