const express = require('express');
const projectsRouter = require('./projects/projects-router');
const { logger } = require('./projects/projects-middleware');

const server = express();

server.use(express.json())
server.use(logger);
server.use('/', projectsRouter);

server.get('/', (req, res) => {
    res.send('Barrd Aim');
})
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
