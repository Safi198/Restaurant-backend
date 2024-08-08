const morgan = require("morgan");
const winston = require("winston");
const path = require("path");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: path.join("logs", "error.log"),
            level: "error",
        }),
        new winston.transports.File({
            filename: path.join("logs", "combined.log"),
        }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

logger.stream = {
    write: function (message, encoding) {
        logger.info(message.trim());
    },
};

const logRequest = morgan("combined", { stream: logger.stream });

module.exports = { logRequest, logger };
