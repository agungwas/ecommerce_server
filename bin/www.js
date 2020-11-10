const http = require('http')
const app = require('../app')
const port = 3000

const server = http.createServer(app)
server.listen(port, _=> console.log('Listening to server from bin folder'))