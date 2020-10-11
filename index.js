/**
 * @param {Object} [options]
 * @param {function (Object, Object, function () : void) : void} [options.violationHandler]
 * @returns {function (...string) : function (Object, Object, function () : void) : void}
 */
module.exports = (options = {}) => {
    const {
        violationHandler = (_, res) => {
            res.status(400).send("Bad Request");
        },
    } = options;

    return function (...required) {
        return (req, res, next) => {
            Object.keys(req.query).forEach((key) => {
                if ((req.query[key]?.length || 0) <= 0) {
                    delete req.query[key];
                }
            });

            for (let key of required) {
                if (req.query[key] === undefined) {
                    return violationHandler(req, res, next);
                }
            }

            next();
        };
    };
};
