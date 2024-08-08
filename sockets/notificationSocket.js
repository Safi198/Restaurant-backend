const WebSocket = require('ws');
const { logger } = require('../middleware/logger');

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        logger.info('New WebSocket connection established');

        ws.on('message', (message) => {
            logger.info('Received message: ' + message);
        });

        ws.send('Welcome to the WebSocket server!');
    });
};

module.exports = setupWebSocket;
