import rateLimiter from 'express-rate-limit';

const limiter = rateLimiter({
    windowMs: 10 * 1000,
    max: 5,
    message: {
        status: 429,
        error: 'Demasiadas solucitudes, volve a intentar más tarde'
    }
})

export default limiter;