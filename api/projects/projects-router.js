const express = require('express');
const Projects = require('./projects-model');
const Actions = require('../actions/actions-model')
const { validateProjectId, validateProject } = require('./projects-middleware');

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
    Projects.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        }).catch(next);
})

router.put('/api/projects/:id', validateProjectId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
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

router.delete('/api/projects/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(() => {
            return Projects.get(req.params.id)
                .then(() => {
                    res.json(req.project)
                })
        })
        .catch(next)
});


router.get('/api/projects/:id/actions', validateProjectId, async (req, res, next) => {
    try {
         await Projects.getProjectActions(req.body)
        .then(() => {
            return Actions.get(req.body.action)
            .then(actions => {
                res.json(actions)
            });
        }).catch(next);
        // const projectActions =
        // res.json(projectActions);

    } catch (err) {
        next(err);
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: "problems inside projects router happened",
        message: err.message,
        stack: err.stack
    })
});

module.exports = router;