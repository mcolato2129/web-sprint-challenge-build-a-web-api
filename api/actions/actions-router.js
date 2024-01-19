const express = require('express');
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')
const { validateActionsId, validateActions } = require('./actions-middlware')
const { validateProjectId, validateProject } = require('../projects/projects-middleware')

const router = express.Router();

router.get('/relax', (req, res) => {
    res.send('Just Breathe. Keep your connection with Allah. He will take care of you')
})

router.get('/api/actions', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.send(actions)
        }).catch(next);
})

router.get('/api/actions/:id', validateActionsId, (req, res, next) => {
    res.json(req.action);
})

router.post('/api/actions', validateActions, (req, res, next) => {
    Actions.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction);
        }).catch(next);
})

router.put('/api/actions/:id', validateProjectId, validateActions, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(() => {
            return Actions.get(req.params.id)
                .then(updatedAction => {
                    if (!updatedAction) {
                        res.status(400).json({ message: 'the request body is missing name, description, completed or project_id' })
                    } else {
                        res.json(updatedAction)
                    }
                })
                .catch(next)
        })
})

router.delete('/api/actions/:id', validateActionsId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            return Actions.get(req.params.id)
                .then(() => {
                    res.json(req.action)
                })
        })
        .catch(next)
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: "projects inside actions router happened",
        message: err.message,
        stack: err.stack
    })
});

module.exports = router;