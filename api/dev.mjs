import 'dotenv/config';
import app from '../src/app.mjs';

const port = process.env.PORT ?? 3000;
app.listen(port, () => {console.log(`Servidor en http://localhost:${port}`);});