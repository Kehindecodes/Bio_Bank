const http = require('http');
const app = require('./app');
const{checkConnection} = require('./database.config');

const server = http.createServer(app);
const PORT = process.env.PORT || 5050;

async function startServer() {
   await checkConnection();
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();