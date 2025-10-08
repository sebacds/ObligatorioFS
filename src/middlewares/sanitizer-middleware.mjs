import xss from 'xss';

const xssSanitizer = (req, res, next) => {
    const sanitizeObject = (obj) => {
        for (const key in obj) {
            if (typeof obj[key] == "string") {
                obj[key] = xss(obj[key]);
            } else if (typeof obj[key] == "object" && obj[key] != null) {
                sanitizeObject(obj[key]);
            }
        }
    };

    sanitizeObject(req.body);
    sanitizeObject(req.params);
    sanitizeObject(req.query);
    next();
};

export default xssSanitizer;