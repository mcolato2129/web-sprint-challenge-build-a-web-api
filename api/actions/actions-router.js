const express = require('express');
const Actions = require('./actions-model')
const {
    validateActionsId
} = require('./actions-middlware')

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

router.post('/api/actions', validateActionsId, (req, res, next) => {
    Projects.insert({ notes: req.notes, description: req.description, project_id: req.params.id })
        .then(newProject => {
            res.status(201).json(newProject)
        }).catch(next);
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: "Barrrd Aim inside projects router happened",
        message: err.message,
        stack: err.stack
    })
});

module.exports = router;