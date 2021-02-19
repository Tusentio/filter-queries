function filterQueries(
    requiredParams,
    violationHandler = (req, res, next) => {
        res.sendStatus(400);
    }
) {
    return (req, res, next) => {
        for (const [key, value] of Object.entries(req.query)) {
            if (!value) {
                delete req.query[key];
            }
        }

        for (const key of requiredParams) {
            if (!req.query.hasOwnPropery(key) || typeof key != "string") {
                return void violationHandler(req, res, next);
            }
        }

        return next();
    };
}

module.exports = filterQueries;
