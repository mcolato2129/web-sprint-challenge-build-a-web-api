const express = require('express');
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');
const { logger } = require('./projects/projects-middleware');

const server = express();

server.use(express.json())
server.use(logger);
server.use('/', projectsRouter);
server.use('/', actionsRouter);

server.get('/', (req, res) => {
    res.send('Barrd Aim');
})

module.exports = server;
