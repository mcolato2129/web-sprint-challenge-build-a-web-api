const express = require('express');
const Projects = require('./projects-model');
const {
    validateProjectId,
    validateProject,

} = require('./projects-middleware');

const router = express.Router();

router.get('/right', (req, res) => {
    res.send('There is an enemy combarrrrrrrnnt to your left!!');
})

router.get('/api/projects', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.send(projects)
        }).catch(next);
})

router.get('/api/projects/:id', validateProjectId, (req, res, next) => {
    res.json(req.project);
})

router.post('/api/projects', validateProject, (req, res, next) => {
    Projects.insert({ name: req.name, description: req.description })
        .then(newProject => {
            res.status(201).json(newProject)
        }).catch(next);
})

router.put('/api/projects/:id', validateProjectId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, { name: req.name, description: req.description})
        .then(() => {
            return Projects.get(req.params.id)
                .then(updatedProject => {
                    if (!updatedProject) {
                        res.status(400).json({ message: 'the request body is missing name, description or completed' })
                    } else {
                        res.json(updatedProject)
                    }
                })
                .catch(next)
        })
})

router.get('/api/projects/:id/action', validateProjectId, async (req, res, next )=> {
    try {
        const result = await Projects.getProjectActions(req.params.id);
        res.json(result);
      } catch (err) {
        next(err);
      }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: "Barrrd Aim inside projects router happened",
        message: err.message,
        stack: err.stack
    })
});

module.exports = router;