import xss from 'xss';

const xssSanitizer = () => {
    return (req, res, next) => { 
        const sanitizeObject = (obj) => {
            if (!obj) return;

            for (const key in obj) {
                if (typeof obj[key] == 'string') {
                    obj[key] = xss(obj[key]);
                } else if (Array.isArray(obj[key])) {
                    obj[key] = obj[key].map(item => (typeof item == 'string' ? xss(item) : item));
                } else if (typeof obj[key] == 'object' && obj[key] == null) {
                    sanitizeObject(obj[key]);
                }
            }
        }

        sanitizeObject(req.body);
        sanitizeObject(req.params);
        sanitizeObject(req.query);
        
        next();
    }
}

export default xssSanitizer;