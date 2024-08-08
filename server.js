const app = require("./app");
const setupWebSocket = require("./sockets/notificationSocket");
const { logger } = require("./middleware/logger");

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

socketMiddleware(server);
