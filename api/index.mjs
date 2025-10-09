// Versión ultra simple para testing
import express from 'express';

const app = express();

app.get('*', (req, res) => {
    res.json({ 
        message: 'API básica funcionando',
        path: req.path,
        timestamp: new Date().toISOString()
    });
});

export default app;