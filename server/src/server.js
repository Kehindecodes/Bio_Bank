const http = require('http');
const app = require('./app');
const{checkConnection} = require('./services/database.config');

const server = http.createServer(app);
const PORT = process.env.PORT || 5050;

/**
 * Starts the server and listens on the specified PORT.
 *
 * @return {Promise<void>} - Resolves when the server is started successfully.
 */
async function startServer() {
   await checkConnection();
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();