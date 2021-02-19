/**
 * @param {any} [options]
 * @param {function (any, any, function () : void) : void} [options.violationHandler]
 * @returns {function (...string) : function (any, any, function () : void) : void}
 */
module.exports = (options = {}) => {
    const {
        violationHandler = (_, res) => {
            return res.sendStatus(400);
        },
    } = options;

    return function (...required) {
        return (req, res, next) => {
            const queryKeys = new Set(Object.getOwnPropertyNames(req.query));
            const missingKey = required.find((key) => !queryKeys.has(key));

            if (missingKey !== undefined) {
                return void violationHandler(req, res, next);
            }

            next();
        };
    };
};
