const Projects = require('./projects-model');

function logger(req, res, next) {
    // DO YOUR MAGIC
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url}`
    );

    next();
};

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id);
        if (!project) {
            res.status(404).json({ message: 'no project with given id' })
        } else {
            req.project = project;
            next();
        }
    } catch (err) {
        res.status(500).json({ message: 'project is bad' })
    }
}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body;
    if (!name || !name.trim() || !description || !description.trim() || typeof completed !== 'boolean' ) {
        res.status(400).json({ message: 'the request body is missing name or description' })
    } else {
        req.name = name;
        req.description = description;
        next();
    }
}



module.exports = {
    logger,
    validateProjectId,
    validateProject,
}