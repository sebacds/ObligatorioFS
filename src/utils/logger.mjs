import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logRequest = async (req) => {
    try {
        const now = new Date();
        const [date] = now.toISOString().split("T");

        const logDir = path.join(__dirname, '..', '..', "logs");
        const logFile = path.join(logDir, `${date}.log`);

        const logMsj = `[${now.toISOString()}] METHOD: ${req.method} ${req.url}\n`;

        await fs.mkdir(logDir, { recursive: true });
        await fs.appendFile(logFile, logMsj);
    } catch (e) {
        console.error('Error escribiendo el log: ', e);
    }
}

export default logRequest;