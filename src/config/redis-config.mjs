import { createClient } from "redis";

export const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
    socket: {
        reconnectStrategy: (retries) => {
            console.log(`♻️ Reintentando conexión (${retries})`);
            // Retorna el tiempo en ms antes de volver a intentar
            return Math.min(retries * 1000, 10000); // espera creciente hasta 3s
        }
    }
});

redisClient.on("error", (err) => console.error("Hubo un error en Redis Client", err));

redisClient.on("connect", () => {
    console.log("🔌 Intentando conectar a Redis...");
});

redisClient.on("ready", async () => {
    console.log("✅ Redis listo para usar");
    printAllRedisData();
});

export const printAllRedisData = async () => {
    let cursor = "0";

    do {
        // SCAN para obtener claves en lotes
        const { cursor: nextCursor, keys } = await redisClient.scan(cursor, { MATCH: "*", COUNT: 100 });
        cursor = nextCursor;

        for (const key of keys) {
            const tipo = await redisClient.type(key); // string, hash, list, set, zset
            let valor;

            try {
                switch (tipo) {
                    case "string":
                        valor = await redisClient.get(key);
                        break;
                    case "hash":
                        valor = await redisClient.hGetAll(key);
                        break;
                    case "list":
                        valor = await redisClient.lRange(key, 0, -1);
                        break;
                    case "set":
                        valor = await redisClient.sMembers(key);
                        break;
                    case "zset":
                        valor = await redisClient.zRange(key, 0, -1, { WITHSCORES: true });
                        break;
                    default:
                        valor = null;
                }
            } catch (err) {
                valor = `Error leyendo valor: ${err.message}`;
            }

            console.log(`Clave: ${key} | Tipo: ${tipo} | Valor:`, valor);
        }
    } while (cursor !== "0");

    console.log("✅ Fin de scan de Redis");
};

redisClient.on("end", () => {
    console.log("⛔ Conexión con Redis cerrada");
});

redisClient.on("reconnecting", () => {
    console.log("♻️  Intentando reconectar a Redis...");
});

redisClient.on("error", (err) => {
    console.error("❌ Error en Redis:", err);
});

const conectarRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
};

export default conectarRedis;