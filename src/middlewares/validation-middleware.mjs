export const validateRequest = (schema, reqValidate) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[reqValidate], { abortEarly: false });

        if (error) {
            res.status(400).json({ errors: error.details.map(d => d.message) });
        } else {
            req[reqValidate] = value;
            next();
        }
    }
}